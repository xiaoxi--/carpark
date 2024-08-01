import express from 'express';
const router: express.Router = express.Router();
import { User } from '@/controllers';
import { UserInterface } from '@/interfaces';
import { busValidator } from '@/utils/validators';
import { toolKit } from '@/sysInit';
import bcrypt from 'bcryptjs';
import { RUNTIME } from '@/env';
import _ from 'lodash';
const { successBody, failBody } = toolKit.utils.backend;

let userInstance = new User();

/**
 * @description 新增用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @return {Object}
 */
router.post('/user', async function (req: any, res: express.Response) {
  let { username, password } = <UserInterface>req.body;
  busValidator.isParamValid([username, password]);
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);
  await userInstance.insert(req.body);
  res.send(successBody('新增用户成功', {}));
});

export default router;
