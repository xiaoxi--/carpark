import _ from 'lodash';
import { standardize } from '@/sysInit';
const { errorCode, XxError } = standardize.errorHandler;

export default {
  /**
   * @description: 判断传入值是否符合判断条件,若符合在返回相应错误
   * @param {Object} condition 传入值:业务数据查询结果,get请求返回Object或null, getall返回对象{count:0,rows:[]},或是针对某一字段的0/1
   * @param {String} message 如果传入值为空/0/getAll未拿到数据，则返回错误信息
   */
  isConditionFullfill(condition: any, message: string) {
    if (!condition) throw new XxError(errorCode.NoMatchRecord, message);
    if (condition.count === 0) throw new XxError(errorCode.NoMatchRecord, message);
    if (condition.data === 0) throw new XxError(errorCode.NoMatchRecord, message);
  },
  /**
   * @description: 判断传入参数是否有假值 [NaN,null,undefined];
   * @param {Object} array 传入值数组:[ '防疫测试', undefined ]
   */
  isParamValid(array: any) {
    const arr_result = array.filter((item) => item || item === 0);
    // let arr_result = _.compact(array) // 去除假值
    if (arr_result.length !== array.length) throw new XxError(errorCode.MissingRequiredParameters, '缺少必填写参数，请检查参数');
  },
};
