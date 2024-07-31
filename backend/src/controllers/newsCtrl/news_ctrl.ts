import BaseCtrl from '../base';
import { news } from '@/models/tables/init-models';
import { tecentCOS } from '@/sysInit';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;
class NewCtrl extends BaseCtrl {
  model = news;

  filepath: string = '/material/publish/news';

  constructor() {
    super();
  }
  uploadImage(path, data) {
    try {
      return tecentCOS.putImage(this.filepath + path, data);
    } catch (err) {
      throw new XxError(errorCode.OssUploadError, err);
    }
  }
}

export default NewCtrl;
