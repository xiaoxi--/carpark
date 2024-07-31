import { standardize } from '@/sysInit';
import _ from 'lodash';
import { Op } from 'sequelize';
const { errorCode, XxError } = standardize.errorHandler;
abstract class BaseCtrl {
  abstract model: any;

  constructor() {}

  /**
   * 插入记录
   * @param {object} _record 插入的对象JSON||对象数组
   * @returns {object} 插入后数据库中的记录
   */
  insert = async (_record: any, _transaction?: any) => {
    try {
      let new_record: any;
      // Insert Array
      if (Object.prototype.toString.call(_record) == '[object Array]') {
        new_record = await this.model.bulkCreate(_record, { transaction: _transaction });
      } else {
        new_record = await this.model.create(_record, { transaction: _transaction });
      }
      return new_record;
    } catch (err) {
      // 错误类型处理
      errTypeHandle(err);
    }
  };

  /**
   * 删除记录
   * 当传入数组时，批量删除
   * @param {object} _query {_id:id}
   * @param {object} _transaction 支持事务
   * @returns {number} 删除的数量
   */
  remove = async (_query: any, _transaction?: any): Promise<any> => {
    try {
      let delRes: number = 0;
      delRes = await this.model.destroy({ where: _query, transaction: _transaction });
      return delRes;
    } catch (err: any) {
      throw new XxError(errorCode.MysqlDeleteError, err.message);
    }
  };

  /**
   * 获取一条记录
   *
   * @param {object} _query {_id:id} 查询条件
   * @returns {object} 查询到的记录
   */
  get = async (_query: any, _attributes?: any) => {
    try {
      let findRes = await this.model.findOne({
        where: _query,
        attributes: _attributes,
        raw: true,
      });

      return findRes;
    } catch (err: any) {
      throw new XxError(errorCode.MysqlFindError, err.message);
    }
  };

  /**
   * 获取TABLE所有记录并统计
   * @param _query 查询条件
   * @param _attributes 限制返回的字段["username","createdAt"]
   * @param _order 排序如[['title', 'DESC']]
   * @param _page 页数如5
   * @param _count 每页数量如20
   * @param _group 分组group by ['user_id']
   * @returns {object} {count:table记录总条数,rows:返回数组}
   */
  getAll = async (_query?: any, _attributes?: any, _order?: any, _page?: any, _count?: any, _inclued?: any) => {
    try {
      const page = _page ? (_page = parseInt(_page)) : null;
      const count = _count ? (_count = parseInt(_count)) : null;
      // [Op.and]:[
      //   {product_title:
      //     {[Op.like]:'%测%'
      //   }
      // ]
      // {start_at:{[Op.between]:["2021","2022"]}},
      // 运算符处理
      _query = this.operator_handle(_query);

      // console.log('_query====>>>', _query)

      let findCountAllRes = await this.model.findAndCountAll({
        include: _inclued,
        where: _query,
        attributes: _attributes,
        order: _order,
        offset: (page - 1) * count,
        limit: count,
        raw: true,
      });
      return findCountAllRes;
    } catch (err: any) {
      throw new XxError(errorCode.MysqlFindError, err.message);
    }
  };

  /**
   * 运算符转换
   * @param query 条件
   * @returns
   *
   * 运算符处理
   * [Op.and]: {a: 5}           // AND (a = 5)
   * [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
   * [Op.gt]: 6,                // > 6
   * [Op.gte]: 6,               // >= 6
   * [Op.lt]: 10,               // < 10
   * [Op.lte]: 10,              // <= 10
   * [Op.ne]: 20,               // != 20
   * [Op.eq]: 3,                // = 3
   * [Op.not]: true,            // IS NOT TRUE
   * [Op.between]: [6, 10],     // BETWEEN 6 AND 10
   * [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
   * [Op.in]: [1, 2],           // IN [1, 2]
   * [Op.notIn]: [1, 2],        // NOT IN [1, 2]
   * [Op.like]: '%hat',         // LIKE '%hat'
   * [Op.notLike]: '%hat'       // NOT LIKE '%hat'
   * [Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
   * [Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
   * [Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
   * [Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
   * [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
   * [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
   * [Op.like]: { [Op.any]: ['cat', 'hat']}  // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
   * [Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
   * [Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
   * [Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
   * [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
   * [Op.col]: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
   *
   * ⚠️Op为sequelize模块
   *   Op支持组合使用
   *
   * {name:{ type: 'not', value: 'xx' }}
   *
   * 多条件查询语法
   * {
   * name:{ type: 'not', value: 'xx' },
   * opand:[
   * {key:{type,value}}
   * {key:{type,value}}
   * {key:{type,value}}
   * ]}
   */
  operator_handle(query: any): any {
    _.each(query, (v, key: any) => {
      if (v === '' || v === undefined) return delete query[key];
      if (v && v.type) {
        switch (v.type) {
          case 'like':
            return (query[key] = { [Op.like]: `%${v.value}%` });
          default:
            query[key] = { [Op[v.type]]: v.value };
            break;
        }
      } else {
        switch (key) {
          case 'opand':
            query = {
              ...query,
              [Op.and]: _.map(query[key], (item) => {
                return this.operator_handle(item);
              }),
            };
            return delete query[key];
          case 'opor':
            query = {
              ...query,
              [Op.or]: _.map(query[key], (item) => {
                return this.operator_handle(item);
              }),
            };
            return delete query[key];
          default:
            break;
        }
      }
    });
    return query;
  }

  /**
   * 更新TABLE操作
   * @param {object} _query 更新条件 {key:value}
   * @param {object} _record 待更新的数据 {key:value}
   * @returns {number} 更新的数量
   */
  update = async (_query: any, _record: any, _transaction?: any): Promise<number> => {
    try {
      _query = this.operator_handle(_query);
      let updateRes = await this.model.update(_record, { where: _query, transaction: _transaction });
      return updateRes[0];
    } catch (err) {
      errTypeHandle(err);
    }
  };

  /**
   * 插入或更新单行
   * @param {object} _record 待操作记录 {key:value}
   * @returns {number} 更新的数量
   */
  upsert = async (_record: any, _transaction?: any): Promise<number> => {
    try {
      let record: any;
      if (Object.prototype.toString.call(_record) == '[object Array]') {
        _.each(_record, async (item) => {
          [record] = await this.model.upsert(item, { returning: true });
        });
      } else {
        [record] = await this.model.upsert(_record, { returning: true, transaction: _transaction });
      }
      return record;
    } catch (err) {
      errTypeHandle(err);
    }
  };

  /**
   * 计算总和
   * @param {object} _query {_id:id} 查询条件
   * @returns {object} 查询到的记录
   */
  sum = async (_value: any, _query: any) => {
    try {
      let sumRes = await this.model.sum(_value, {
        where: _query,
      });
      return sumRes;
    } catch (err: any) {
      throw new XxError(errorCode.MysqlFindError, err.message);
    }
  };

  /**
   * 计算条目数
   * @param {object} _query {_id:id} 查询条件
   * @returns {object} 查询到的记录
   */
  count = async (_query: any) => {
    try {
      let sumRes = await this.model.count({
        where: _query,
      });
      return sumRes;
    } catch (err: any) {
      throw new XxError(errorCode.MysqlFindError, err.message);
    }
  };
}

/**
 * 错误类型处理
 * @param err
 */
function errTypeHandle(err: any) {
  if (err.name) {
    switch (err.name) {
      case 'SequelizeForeignKeyConstraintError':
        throw new XxError(errorCode.ForeignKeyConstraintError, `操作失败：外键不存在,无效的请求参数!`); // 外键参数不存在（外键约束错误）
      case 'SequelizeDatabaseError':
        if (err.parent.code == '22P02') throw new XxError(errorCode.MysqlOutOfRange, `操作失败：输入值无效，请检查字段类型！`);
        if (err.parent.code == '42703') throw new XxError(errorCode.MysqlOutOfRange, `操作失败：【Models】缺少主键，等待管理员处理 ！`);
        if (err.parent.code == '22007') throw new XxError(errorCode.MysqlOutOfRange, `操作失败：数据格式错误，请检查参数 ！`);
        if (err.parent.code == '23502')
          throw new XxError(
            errorCode.MysqlOutOfRange,
            `操作失败：【Models】同步异常【${err.parent.table}】表缺少【${err.parent.column}】，等待管理员处理 ！`
          );
      case 'SequelizeUniqueConstraintError':
        throw new XxError(errorCode.UpdateDuplicate, `操作失败：【${err.errors[0].value}】 数据已存在！`); // 数据重复
      case 'SequelizeValidationError':
        throw new XxError(errorCode.MissingRequiredParameters, `操作失败：${err.errors[0].message}`);
      default:
        break;
    }
  } else {
    throw new XxError(errorCode.MysqlUpdateError, err.message);
  }
}

export default BaseCtrl;
