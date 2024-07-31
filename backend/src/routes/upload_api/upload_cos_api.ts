import express from 'express'
const router: express.Router = express.Router()
import { News } from '@/controllers'
import { dataFormatUtils } from '@/utils'
import { toolKit } from '@/sysInit'
const { successBody } = toolKit.utils.backend
/**
 * @description: 上传资讯封面
 * @param {String} data 图片转base64
 * @return {Array}
 */
router.post('/cover', async function (req: express.Request, res: express.Response) {
    let newsIns = new News()
    const imageData: any = dataFormatUtils.formattedImage(req.body.data)
    const uploadRes = await newsIns.uploadImage(`/${imageData.imageName}`, imageData.bytes)
    res.send(successBody('上传成功', uploadRes))
})

export default router
