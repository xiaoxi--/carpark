import { sessionInterface } from '@/interfaces';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;

//检查用户session中是否有选择的组织机构角色信息
export async function isPermissionSetUp(userInfo: sessionInterface) {
  if (!userInfo.permission) {
    throw new XxError(errorCode.NotSetUpPermission, '用户未选择角色信息');
  }
}
