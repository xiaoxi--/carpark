import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { news, newsId } from './news';

export interface n_target_personAttributes {
  n_target_person_id: number;
  news_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type n_target_personPk = "n_target_person_id";
export type n_target_personId = n_target_person[n_target_personPk];
export type n_target_personCreationAttributes = Optional<n_target_personAttributes, n_target_personPk>;

export class n_target_person extends Model<n_target_personAttributes, n_target_personCreationAttributes> implements n_target_personAttributes {
  n_target_person_id!: number;
  news_id!: number;
  user_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // n_target_person belongsTo news via news_id
  news!: news;
  getNews!: Sequelize.BelongsToGetAssociationMixin<news>;
  setNews!: Sequelize.BelongsToSetAssociationMixin<news, newsId>;
  createNews!: Sequelize.BelongsToCreateAssociationMixin<news>;

  static initModel(sequelize: Sequelize.Sequelize): typeof n_target_person {
    n_target_person.init({
    n_target_person_id: {
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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "指定接收用户id"
    }
  }, {
    sequelize,
    tableName: 'n_target_person',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "n_target_person_pkey",
        unique: true,
        fields: [
          { name: "n_target_person_id" },
        ]
      },
    ]
  });
  return n_target_person;
  }
}
