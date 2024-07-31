import express from 'express';
const router: express.Router = express.Router();
import { Carparks } from '@/controllers';
import { dataFormatUtils } from '@/utils';
import { toolKit } from '@/sysInit';
const { successBody } = toolKit.utils.backend;
/**
 * @description: 上传数据
 * @param {String} data 图片转base64
 * @return {Array}
 */
router.post('/carparks_file', async function (req: express.Request, res: express.Response) {
  let carparksIns = new Carparks();
  const imageData: any = dataFormatUtils.formattedImage(req.body.data);
  //   const uploadRes = await carparksIns.uploadImage(`/${imageData.imageName}`, imageData.bytes);
  const uploadRes = {};
  res.send(successBody('上传成功', uploadRes));
});

export default router;
