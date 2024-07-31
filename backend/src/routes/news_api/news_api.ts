import express from 'express'
const router: express.Router = express.Router()
import { News, NewsTagRelationship, VwNews } from '@/controllers'
import { newsInterface, sessionInterface, availableInterface } from '@/interfaces'
import { busValidator } from '@/utils/validators'
import { toolKit, redisClient, sequelize } from '@/sysInit'
import { dataFormatUtils } from '@/utils'
import { RUNTIME } from '@/env'
const { redisServer } = RUNTIME
import _ from 'lodash'
const { successBody, failBody } = toolKit.utils.backend
const { common } = toolKit.validator

let newsInstance = new News()
let vwNewsInstance = new VwNews()
let newsTagRelationshipInstance = new NewsTagRelationship()

/**
 * @description 获取资讯列表
 * @param {string} query 查询条件
 * @param {number} page 页数
 * @param {number} count 每页数量
 * @return {Object}
 */
router.get('/news', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const query = req.query.query ? JSON.parse(req.query.query as string) : {}
    const sort = dataFormatUtils.sortObjformat(req.query, { createdAt: 'DESC' })
    const { page, count } = req.query
    const findRes = await vwNewsInstance.getAll({ ...query, publisher_user_id: user_id }, null, sort, page, count)
    res.send(successBody('获取资讯列表成功', findRes))
})

/**
 * @description 新增资讯
 * @param {string} cover 封面图片
 * @param {string} title 标题
 * @param {string} description 描述
 * @param {string} content 内容
 * @return {Object}
 */
router.post('/news', async function (req: any, res: express.Response) {
    let t = await sequelize.transaction()
    try {
        const { user_id } = <sessionInterface>req['payload']
        const { cover, title, description, content, news_tag_id_list } = <newsInterface>req.body
        busValidator.isParamValid([cover, title, content, news_tag_id_list])
        // 标签条目数限制
        if (news_tag_id_list.length > 5) busValidator.isConditionFullfill('', '操作失败，标签条数限制5条')
        // insert资讯
        const insertRes = await newsInstance.insert({ ...req.body, publisher_user_id: user_id, createdBy: user_id }, t)
        // insert标签
        const tagData = dataFormatUtils.arrayLoop(news_tag_id_list, insertRes.news_id, ['tag_id', 'news_id'])
        await newsTagRelationshipInstance.insert(tagData, t)
        await t.commit()
        res.send(successBody('新增资讯成功', insertRes))
    } catch (err: any) {
        await t.rollback()
        res.send(failBody(err.code, err.message))
    }
})

/**
 * @description 编辑资讯
 * @param {number} news_id 封面图片
 * @param {string} cover 封面图片
 * @param {string} title 标题
 * @param {string} description 描述
 * @param {string} content 内容
 * @return {Object}
 */
router.put('/news/:news_id', async function (req: any, res: express.Response) {
    let t = await sequelize.transaction()
    try {
        const { user_id } = <sessionInterface>req['payload']
        const { cover, title, description, content, news_tag_id_list } = <newsInterface>req.body
        const { news_id } = req.params

        busValidator.isParamValid([news_id, cover, title, content, news_tag_id_list])
        // 标签条目数限制
        if (news_tag_id_list.length > 5) busValidator.isConditionFullfill('', '操作失败，标签条数限制5条')
        // 只允许编辑【本组织机构】&资讯状态是【待审核、未通过】
        const updateRes = await newsInstance.update({ news_id: news_id, publisher_user_id: user_id, audit_state: ['0', '3'] }, req.body, t)
        // delete标签
        await newsTagRelationshipInstance.remove({ news_id: news_id }, t)
        // insert标签
        const tagData = dataFormatUtils.arrayLoop(news_tag_id_list, news_id, ['tag_id', 'news_id'])
        await newsTagRelationshipInstance.insert(tagData, t)
        await t.commit()
        res.send(successBody('编辑资讯成功', updateRes))
    } catch (err: any) {
        await t.rollback()
        res.send(failBody(err.code, err.message))
    }
})

/**
 * @description 获取资讯详情
 * @param {number} news_id 资讯ID
 * @return {Object}
 */
router.get('/news/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params
    const findOneRes = await vwNewsInstance.get({
        news_id: news_id,
        publisher_user_id: user_id,
    })
    common.hitCondition(findOneRes, '获取资讯详情失败')
    // Redis访问数
    const view_count = await redisClient.get(`${redisServer.redis_news_view_count}:${news_id}`) // 获取访问量
    if (view_count) findOneRes.views = view_count
    findOneRes.news_tag_id_list = JSON.parse(findOneRes.news_tag_id_list)
    findOneRes.tag_list = JSON.parse(findOneRes.tag_list)
    res.send(successBody('获取资讯详情成功', findOneRes))
})

/**
 * @description  停用&启用资讯
 * @param {number} news_id 资讯ID
 * @return {Object}
 */
router.put('/news/available/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params
    const { available } = <availableInterface>req.body
    busValidator.isParamValid([available])
    const query = { publisher_user_id: user_id, news_id: news_id, audit_state: '2' }
    const updateRes = await newsInstance.update(query, { available: available })
    res.send(successBody(available == '0' ? '停用资讯成功' : '启用资讯成功', updateRes))
})

/**
 * @description 提交资讯审核
 * @param {string} news_id 资讯ID
 * @return {Object}
 */
router.put('/news/submit/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params
    /**
     * 根据audit_state判断操作，提交或取消
     * 检查资讯是否可操作
     * 获取审核角色ID
     * 根据组织机构ID、角色ID，获取机构下审核权限用户ID （审核人员可能有多个）
     * 发送消息到MQ,MQ消息接收者为机构下审核权限用户（MQ需要支持数组发送）
     */
    const query = { publisher_user_id: user_id, news_id: news_id, audit_state: '0' }
    const updateRes = await newsInstance.update(query, { audit_state: '2' })
    res.send(successBody('提交资讯审核成功', updateRes))
})

/**
 * @description 取消资讯审核
 * @param {string} news_id 资讯ID
 * @return {Object}
 */
router.put('/news/cancel/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params

    /**
     * 根据audit_state判断操作，提交或取消
     * 检查资讯是否可操作
     * 获取审核角色ID
     * 根据组织机构ID、角色ID，获取机构下审核权限用户ID （审核人员可能有多个）
     * 发送消息到MQ,MQ消息接收者为机构下审核权限用户（MQ需要支持数组发送）
     */

    const query = { publisher_user_id: user_id, news_id: news_id, audit_state: '1' }
    const updateRes = await newsInstance.update(query, { audit_state: '0' })
    res.send(successBody('取消资讯审核成功', updateRes))
})
export default router
