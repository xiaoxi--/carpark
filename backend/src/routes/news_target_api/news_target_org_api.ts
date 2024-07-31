import express from 'express'
const router: express.Router = express.Router()
import { dataFormatUtils } from '@/utils'
import { News, NTargetOrg } from '@/controllers'
import { newsTargetInterface, sessionInterface } from '@/interfaces'
import { busValidator } from '@/utils/validators'
import _ from 'lodash'
import { toolKit, sequelize } from '@/sysInit'
const { successBody, failBody } = toolKit.utils.backend
let newsInstance = new News()
let nTargetOrgInstance = new NTargetOrg()

/**
 * @description 新增/编辑资讯目标群体
 * @param {object} body
 * @param {number} body.news_id 资讯ID
 * @param {string} body.org_id 资讯目标组织id(与用户管理微服务中组织机构表保持一致)
 * @param {string} body.role_id_list 指定接收资讯的角色
 * @return {Object}
 */
router.post('/news_target/org', async function (req: any, res: express.Response) {
    let t = await sequelize.transaction()
    try {
        const { user_id } = <sessionInterface>req['payload']
        let { news_id, news_target_org_list } = <newsTargetInterface>req.body
        busValidator.isParamValid([news_id, news_target_org_list])
        /**
         * 检查操作的数据是否是我的组织机构
         * 检查资讯是否审核状态
         */
        const querykobj = { news_id: news_id, publisher_user_id: user_id, audit_state: ['0', '3'] }
        const findNewsRes = await newsInstance.get(querykobj)
        busValidator.isConditionFullfill(findNewsRes, '无操作权限')

        /**
         * 数据格式化
         */
        const insertData = []
        _.each(news_target_org_list, item => {
            insertData.push({
                news_id: news_id,
                org_id: item.org_id,
                role_id_list: dataFormatUtils.formattedArrayTString(item.role_id_list),
            })
        })
        /**
         * remove目标群体
         * insert目标群体
         */
        await nTargetOrgInstance.remove({ news_id: news_id }, t)
        const insertRes = await nTargetOrgInstance.insert(insertData, t)
        await t.commit()
        res.send(successBody('记录资讯目标部门成功', insertRes))
    } catch (err: any) {
        await t.rollback()
        res.send(failBody(err.code, err.message))
    }
})

/**
 * @description 获取资讯目标群体
 * @param {object} body
 * @param {number} body.news_id 资讯ID
 * @return {Object}
 */
router.get('/news_target/org/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params
    // 校验是否有操作权限
    const findCheckRes = await newsInstance.get({ publisher_user_id: user_id, news_id: news_id })
    busValidator.isConditionFullfill(findCheckRes, '无操作权限')
    const findAllRes = await nTargetOrgInstance.getAll({ news_id: news_id })
    // 数据格式化
    _.map(findAllRes.rows, item => {
        item.role_id_list = dataFormatUtils.formattedStringToArray(item.role_id_list)
    })
    res.send(successBody('获取资讯目标部门成功', findAllRes))
})
export default router
