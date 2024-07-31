import express from 'express'
const router: express.Router = express.Router()
import { dataFormatUtils } from '@/utils'
import { News, VwNTargetIndex } from '@/controllers'
import { sessionInterface, newsTargetInterface } from '@/interfaces'
import { busValidator } from '@/utils/validators'
import { sequelize } from '@/sysInit'
import { toolKit } from '@/sysInit'
const { successBody, failBody } = toolKit.utils.backend
import _ from 'lodash'

let newsInstance = new News()
let vwNTargetIndexInstance = new VwNTargetIndex()

/**
 * @description 获取资讯目标群体详情
 * @param {string} news_id 资讯ID
 * @param {string} isuser 是否查询指定用户（0否 1是）不带参数查询全部
 * @return {Object}
 */
router.get('/news_target/index/:news_id', async function (req: any, res: express.Response) {
    const { user_id } = <sessionInterface>req['payload']
    const { news_id } = req.params
    // 校验是否有操作权限
    const findCheckRes = await newsInstance.get({ publisher_user_id: user_id, news_id: news_id })
    busValidator.isConditionFullfill(findCheckRes, '无操作权限')
    // 获取数据
    const findRes = await vwNTargetIndexInstance.get({ news_id: news_id })
    res.send(successBody('获取资讯目标群体详情成功', findRes))
})

export default router
