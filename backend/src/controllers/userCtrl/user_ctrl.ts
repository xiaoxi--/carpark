import BaseCtrl from '../base';
import { users } from '@/models/tables/init-models';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;
class UserCtrl extends BaseCtrl {
  model = users;
}

export default UserCtrl;
