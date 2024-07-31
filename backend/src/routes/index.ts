import express, { Request, Response } from 'express';
const router: express.Router = express.Router();
import { redisClient } from '@/sysInit';
import { commonUtils } from '@/utils';
import { toolKit } from '@/sysInit';
import { RUNTIME } from '@/env';
import { sessionInterface } from '@/interfaces';
import { authValidator, busValidator } from '@/utils/validators';
import { User } from '@/controllers';
const { successBody, failBody } = toolKit.utils.backend;
const { redisServer, cookieOption } = RUNTIME;

router.use('/auth', async function (req: any, res: Response, next) {
  let sessionid = req.cookies['sessionid'] ? req.cookies['sessionid'] : '';
  // const sessionid = req.headers['sessionid'] ? req.headers['sessionid'] : '';
  const sessionArr = sessionid.split('::');
  const userId = sessionArr[0];
  const sessionId = sessionArr[1];
  let userInfo = await redisClient.get(`${redisServer.redis_cms_login_session}:${userId}`);
  toolKit.validator.auth.isValidSessionId(userInfo, sessionId);
  const parsedUserInfo: sessionInterface = JSON.parse(userInfo);
  // await isPermissionSetUp(parsedUserInfo)
  req.payload = parsedUserInfo;
  // await authorization.isApiAccessible(userInfoObj.permission.role_id, req.method, req.path);
  next();
});

/**
 * 用户登录，返回jwt Token, Token expired time, user profile给client
 * @param {string} userName
 * @param {string} password
 */
router.post('/login', async function (req: Request, res: Response) {
  try {
    let userInstance = new User();
    const username = req.body.username ? req.body.username : '';
    const password = req.body.password ? req.body.password : '';
    // 判断客户账号是否存在
    let customerInfo = await userInstance.get({ username: username });
    if (!customerInfo) busValidator.isConditionFullfill('', '账号不存在');
    let accountInfo = await userInstance.get({ username: username });
    // 判断密码
    authValidator.isValidLoginInfo(accountInfo, password);
    let sessionID = commonUtils.getRandom(18);
    const userInfo = JSON.stringify({
      sessionID: sessionID,
      username: accountInfo.username,
      user_id: accountInfo.user_id,
    });
    // 生成session_id,设置过期时间3天
    let storeLoginSession = await redisClient
      .multi()
      .set(`${redisServer.redis_cms_login_session}:${accountInfo.user_id}`, userInfo)
      .expire(`${redisServer.redis_cms_login_session}:${accountInfo.user_id}`, 60 * 60 * 24 * 365)
      .exec();
    busValidator.isConditionFullfill(storeLoginSession[1], '存储登录会话错误');
    delete accountInfo.password;
    res.cookie('sessionid', accountInfo.user_id + '::' + sessionID, cookieOption);

    res.send(
      successBody('登录成功', {
        token: accountInfo.user_id + '::' + sessionID,
        profile: { ...accountInfo, username: customerInfo.username },
      })
    );
  } catch (err) {
    res.send(failBody(err.code, err.message));
  }
});

export default router;
