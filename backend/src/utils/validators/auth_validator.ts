import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;
import bcrypt from 'bcryptjs';
import { redisClient } from '@/sysInit';
import { sysParameter } from '@/config';
import { JwtPayloadInterface } from '@/interfaces';
import jwt from 'jwt-simple';
import { RUNTIME } from '@/env';

const { redisServer } = RUNTIME;

export default {
  //判断sessionId是否合法
  isValidSessionId: (userInfo, sessionId: string) => {
    if (!userInfo) {
      throw new XxError(errorCode.SessionNotFoundError, '未找到登录信息，请重新登录');
    }
    if (JSON.parse(userInfo).sessionID !== sessionId) {
      throw new XxError(errorCode.SessionInvalidError, '会话非法，会话被服务器拒绝');
    }
  },
  //判断登录信息用户名密码是否正确
  isValidLoginInfo: (accountInfo, password: string) => {
    if (!accountInfo) {
      throw new XxError(errorCode.UsernameNotFound, '用户名不存在');
    }
    if (!bcrypt.compareSync(password, accountInfo.password)) {
      throw new XxError(errorCode.PasswordError, '密码错误');
    }
  },
  //检查登录账户是不是系统用户账号
  isEmployee: (data) => {
    if (!data) {
      throw new XxError(errorCode.NotEmployee, '不是系统用户账号');
    }
  },
  //检查邀请任职token是否合法
  isValidInvitationToken: async (jwttoken: string): Promise<JwtPayloadInterface> => {
    const decoded = jwt.decode(jwttoken, sysParameter.jwtTokenSecret);
    if (Date.now() > decoded.exp) {
      throw new XxError(errorCode.InvitationTokenExpired, '邀请已过期');
    }
    let notUsed = await redisClient.get(`${redisServer.invitation_token_session}:${decoded.org_id}:${decoded.phone}`);
    if (!notUsed) {
      throw new XxError(errorCode.InvitationTokenExpired, '邀请已回复,链接失效');
    }
    return decoded;
  },
  //检查用户session中是否有选择的组织机构角色信息
  isPermissionSetUp: async (userInfo) => {
    if (!userInfo.permission) {
      throw new XxError(errorCode.NotSetUpPermission, '用户未选择角色信息');
    }
  },
};
