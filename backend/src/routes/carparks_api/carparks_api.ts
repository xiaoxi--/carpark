import express from 'express';
const router: express.Router = express.Router();
import { Carparks } from '@/controllers';
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

let carparksInstance = new Carparks();

/**
 * @description 导入停车场
 * @param {File} file 导入文件
 * @return {Object}
 */
router.post('/carparks', uploadUtils.single('file'), async function (req: any, res: express.Response) {
  let t = await sequelize.transaction();
  try {
    if (!req.file) {
      await t.rollback();
      res.send(failBody(400, 'No file uploaded.'));
    }
    // 获取上传的文件
    const file = req.file;
    // 解析 CSV 文件并将数据写入数据库
    const carparks: any[] = [];
    const fileStream = fs.createReadStream(req.file.path).pipe(csvParser());
    for await (const row of fileStream) {
      carparks.push(transformRowToCarpark(row));
    }
    await carparksInstance.insert(carparks, t);
    await t.commit();
    res.send(successBody('导入停车场数据成功', {}));
  } catch (err) {
    await t.rollback();
    res.send(failBody(err.code, err.message));
  }
});

// 转换 CSV 行到停车场对象的函数
function transformRowToCarpark(row: any) {
  return {
    car_park_no: row.car_park_no, // 假设列名是 car_park_no
    address: row.address,
    free_parking: row.free_parking,
    night_parking: row.night_parking === 'YES',
    car_park_type: row.car_park_type,
    type_of_parking_system: row.type_of_parking_system,
    short_term_parking: row.short_term_parking,
    car_park_decks: parseInt(row.car_park_decks, 10), // 转换为整数
    gantry_height: parseFloat(row.gantry_height), // 转换为浮点数
    car_park_basement: row.car_park_basement === 'Y',
    x_coord: parseFloat(row.x_coord),
    y_coord: parseFloat(row.y_coord),
  };
}

/**
 * @description 查询停车场
 * @param {string} query 查询条件
 * @param {number} count 每页数量
 * @param {number} query 查询条件
 * @param {number} sort 排序方法
 * @return {Object}
 */
router.get('/carparks', async function (req: any, res: express.Response) {
  const { page, count } = req.query;
  const sort = dataFormatUtils.sortObjformat(req.query, { createdAt: 'DESC' });
  const query = req.query.query ? JSON.parse(req.query.query as string) : {};
  const findRes = await carparksInstance.getAll(query, null, sort, page, count);
  res.send(successBody('获取资讯列表成功', findRes));
});

export default router;
