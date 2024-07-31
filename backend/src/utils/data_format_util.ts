/**
 * @description 数据规范工具类
 */
import _ from 'lodash';
import { standardize } from '@/sysInit';
import { json } from 'stream/consumers';
const { errorCode, XxError } = standardize.errorHandler;
export default {
  /**
   * 将规范格式的string转成array
   * @param {String} str [1][2][3]
   * @returns
   */
  formattedStringToArray(str: string) {
    try {
      if (!str) return [];
      return JSON.parse(str.replace(/\]\[/g, ','));
    } catch (e) {
      throw new XxError(errorCode.DataIllegal, '数组化错误，请检查据格式');
    }
  },
  /**
   * 将规范格式的array转成string
   * @param {Array} arr [1,2,3]
   * @returns
   */
  formattedArrayTString(arr: Array<number>) {
    try {
      let toString = ``;
      if (!arr) return undefined;
      _.each(arr, function (item) {
        toString += `[${item}]`;
      });
      return toString;
    } catch (e) {
      throw new XxError(errorCode.DataIllegal, '数组化错误，请检查据格式');
    }
  },
  /**
   * 将规范格式的array格式化转换成数组
   * @param {Array} arr [1,2,2] 标签ID
   * @param {Array} id 业务ID
   * @param {Array} key 对象key列表
   * @returns
   */
  arrayLoop(arr: number[], id: number, key: any) {
    try {
      const tagList = [];
      _.each(arr, (item) => {
        return tagList.push({
          [key[0]]: item,
          [key[1]]: id,
        });
      });
      return tagList;
    } catch (e) {
      throw new XxError(errorCode.DataIllegal, '数组化错误，请检查据格式');
    }
  },

  /**
   * @description:  上传图片文件名/base64处理
   * @param {string} data base64
   */
  formattedImage(data: string) {
    try {
      const head_str = data.split(',')[0];
      const picture_format = head_str.substring(head_str.indexOf('/') + 1, head_str.indexOf(';')); // 截取base64中的图片格式
      const imageName = Date.now() + '.' + picture_format; // 时间戳
      const bytes = data.split(',')[1];
      return { imageName: imageName, bytes: bytes };
    } catch (e) {
      throw new XxError(errorCode.DataIllegal, '上传图片参数错误，请检查数据格式');
    }
  },
  /**
   * 将规范格式的obj格式化转换成数组
   * @param {object} obj {"createdAt":"DESC"}
   * @param {object} defaultObj {"createdAt":"DESC"}
   * @returns
   */
  sortObjformat(obj: any, defaultObj: object) {
    try {
      obj = obj.sort ? (obj.sort == '{}' ? defaultObj : JSON.parse(obj.sort)) : defaultObj;
      let sort = [];
      _.each(obj, (item, index) => {
        sort.push([index, item]);
      });
      return sort;
    } catch (e) {
      throw new XxError(errorCode.DataIllegal, '对象化错误，请检查据格式');
    }
  },
};
