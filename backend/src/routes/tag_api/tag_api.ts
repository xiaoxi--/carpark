import express from 'express'
const router: express.Router = express.Router()
import { Tag, NewsTagRelationship } from '@/controllers'
import { tagInterface, sessionInterface } from '@/interfaces'
import { busValidator } from '@/utils/validators'
import { toolKit } from '@/sysInit'
import { dataFormatUtils } from '@/utils'
const { successBody } = toolKit.utils.backend

let tagInstance = new Tag()
let newsTagRelationshipInstance = new NewsTagRelationship()

/**
 * @description 获取标签列表
 * @param {number} page 页数
 * @param {number} count 每页数量
 * @return {Object}
 */
router.get('/tag', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { page, count } = req.query
    let query = req.query.query ? JSON.parse(req.query.query as string) : {}
    const sort = dataFormatUtils.sortObjformat(req.query, { createdAt: 'DESC' })
    query = { ...query, user_id: user_id }
    const findRes = await tagInstance.getAll(query, null, sort, page, count)
    res.send(successBody('获取标签列表成功', findRes))
})

/**
 * @description 新增标签
 * @param {string} tag 标签名称
 * @param {string} comment 备注
 * @return {Object}
 */
router.post('/tag', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { tag, comment } = <tagInterface>req.body
    busValidator.isParamValid([tag, user_id])
    req.body.user_id = user_id
    const insertRes = await tagInstance.insert(req.body)
    res.send(successBody('新增标签成功', insertRes))
})

/**
 * @description 编辑标签
 * @param {string} tag 标签名称
 * @param {string} comment 备注
 * @return {Object}
 */
router.put('/tag/:tag_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { tag, comment } = <tagInterface>req.body
    busValidator.isParamValid([tag, JSON.parse(req.params.tag_id)])
    const updateRes = await tagInstance.update({ tag_id: req.params.tag_id, user_id: user_id }, req.body)
    res.send(successBody('编辑标签成功', updateRes))
})

/**
 * @description 删除标签
 * @param {string} tag_id 标签ID
 * @return {Object}
 */
router.delete('/tag/:tag_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    busValidator.isParamValid([JSON.parse(req.params.tag_id)])
    const findRes = await newsTagRelationshipInstance.get({ tag_id: req.params.tag_id })
    if (findRes) busValidator.isConditionFullfill('', '操作失败：标签已被使用，无法删除')
    const updateRes = await tagInstance.remove({ tag_id: req.params.tag_id, user_id: user_id })
    res.send(successBody('删除标签成功', updateRes))
})
export default router
