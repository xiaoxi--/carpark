import express from 'express';
const router: express.Router = express.Router();
import { Carparks } from '@/controllers';
import { carparksInterface, sessionInterface, availableInterface } from '@/interfaces';
import { busValidator } from '@/utils/validators';
import { toolKit, redisClient, sequelize } from '@/sysInit';
import { dataFormatUtils } from '@/utils';
import { RUNTIME } from '@/env';
const { redisServer } = RUNTIME;
import _ from 'lodash';
const { successBody, failBody } = toolKit.utils.backend;
const { common } = toolKit.validator;

let carparksInstance = new Carparks();

/**
 * @description 获取资讯列表
 * @param {string} query 查询条件
 * @param {number} page 页数
 * @param {number} count 每页数量
 * @return {Object}
 */
router.get('/news', async function (req: any, res: express.Response) {
  const { user_id } = <sessionInterface>req['payload'];
  const query = req.query.query ? JSON.parse(req.query.query as string) : {};
  const sort = dataFormatUtils.sortObjformat(req.query, { createdAt: 'DESC' });
  const { page, count } = req.query;
  const findRes = await carparksInstance.getAll({ ...query, publisher_user_id: user_id }, null, sort, page, count);
  res.send(successBody('获取资讯列表成功', findRes));
});

export default router;
