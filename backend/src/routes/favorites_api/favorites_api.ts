import express from 'express';
const router: express.Router = express.Router();
import { Favorites } from '@/controllers';
import { carparksInterface, sessionInterface, availableInterface } from '@/interfaces';
import { busValidator } from '@/utils/validators';
import { toolKit, redisClient, sequelize } from '@/sysInit';
import { dataFormatUtils, uploadUtils } from '@/utils';
import { RUNTIME } from '@/env';
import _ from 'lodash';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
const { redisServer } = RUNTIME;
const { successBody, failBody } = toolKit.utils.backend;
const { common } = toolKit.validator;
// 配置 multer 用于文件上传

let favoritesInstance = new Favorites();

/**
 * @description 添加收藏
 * @param {number} carparks_id 停车场ID
 * @return {Object}
 */
router.post('/favorites', async function (req: any, res: express.Response) {
  const { user_id } = <sessionInterface>req['payload'];
  let { carparks_id } = req.body;
  const data = await favoritesInstance.get({ user_id, carparks_id });
  data ? await favoritesInstance.remove({ user_id, carparks_id }) : await favoritesInstance.insert({ user_id, carparks_id });
  res.send(successBody(`${data ? '取消收藏' : '收藏'}停车场成功`, {}));
});

/**
 * @description 获取收藏
 * @param {number} count 每页数量
 * @param {number} query 查询条件
 * @param {number} sort 排序方法
 * @return {Object}
 */
router.get('/favorites', async function (req: any, res: express.Response) {
  const { page, count } = req.query;
  const sort = dataFormatUtils.sortObjformat(req.query, { createdAt: 'DESC' });
  const findRes = await favoritesInstance.getAll({}, null, sort, page, count);
  res.send(successBody('获取收藏列表成功', findRes));
});

export default router;
