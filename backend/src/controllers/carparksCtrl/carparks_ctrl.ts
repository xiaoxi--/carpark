import BaseCtrl from '../base';
import { carparks } from '@/models/tables/init-models';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;
class CarparksCtrl extends BaseCtrl {
  model = carparks;
}

export default CarparksCtrl;
