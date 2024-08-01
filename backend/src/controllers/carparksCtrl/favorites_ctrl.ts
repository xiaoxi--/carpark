import BaseCtrl from '../base';
import { favorites } from '@/models/tables/init-models';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;
class FavoritesCtrl extends BaseCtrl {
  model = favorites;
}

export default FavoritesCtrl;
