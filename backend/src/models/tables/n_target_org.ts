import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { news, newsId } from './news';

export interface n_target_orgAttributes {
  n_target_org_id: number;
  news_id: number;
  org_id: number;
  role_id_list?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type n_target_orgPk = "n_target_org_id";
export type n_target_orgId = n_target_org[n_target_orgPk];
export type n_target_orgCreationAttributes = Optional<n_target_orgAttributes, n_target_orgPk>;

export class n_target_org extends Model<n_target_orgAttributes, n_target_orgCreationAttributes> implements n_target_orgAttributes {
  n_target_org_id!: number;
  news_id!: number;
  org_id!: number;
  role_id_list?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // n_target_org belongsTo news via news_id
  news!: news;
  getNews!: Sequelize.BelongsToGetAssociationMixin<news>;
  setNews!: Sequelize.BelongsToSetAssociationMixin<news, newsId>;
  createNews!: Sequelize.BelongsToCreateAssociationMixin<news>;

  static initModel(sequelize: Sequelize.Sequelize): typeof n_target_org {
    n_target_org.init({
    n_target_org_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "问卷目标项id",
      primaryKey: true
    },
    news_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "咨讯id",
      references: {
        model: 'news',
        key: 'news_id'
      }
    },
    org_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "资讯目标组织id"
    },
    role_id_list: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      comment: "指定接收资讯的角色"
    }
  }, {
    sequelize,
    tableName: 'n_target_org',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "n_target_org_pkey",
        unique: true,
        fields: [
          { name: "n_target_org_id" },
        ]
      },
    ]
  });
  return n_target_org;
  }
}
