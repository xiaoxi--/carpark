import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { news, newsId } from './news';
import type { tag, tagId } from './tag';

export interface news_tag_relationshipAttributes {
  news_tag_relationship_id: number;
  tag_id: number;
  news_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type news_tag_relationshipPk = "news_tag_relationship_id";
export type news_tag_relationshipId = news_tag_relationship[news_tag_relationshipPk];
export type news_tag_relationshipCreationAttributes = Optional<news_tag_relationshipAttributes, news_tag_relationshipPk>;

export class news_tag_relationship extends Model<news_tag_relationshipAttributes, news_tag_relationshipCreationAttributes> implements news_tag_relationshipAttributes {
  news_tag_relationship_id!: number;
  tag_id!: number;
  news_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // news_tag_relationship belongsTo news via news_id
  news!: news;
  getNews!: Sequelize.BelongsToGetAssociationMixin<news>;
  setNews!: Sequelize.BelongsToSetAssociationMixin<news, newsId>;
  createNews!: Sequelize.BelongsToCreateAssociationMixin<news>;
  // news_tag_relationship belongsTo tag via tag_id
  tag!: tag;
  getTag!: Sequelize.BelongsToGetAssociationMixin<tag>;
  setTag!: Sequelize.BelongsToSetAssociationMixin<tag, tagId>;
  createTag!: Sequelize.BelongsToCreateAssociationMixin<tag>;

  static initModel(sequelize: Sequelize.Sequelize): typeof news_tag_relationship {
    news_tag_relationship.init({
    news_tag_relationship_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "资讯类型关系ID",
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "标签id",
      references: {
        model: 'tag',
        key: 'tag_id'
      }
    },
    news_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "咨讯id",
      references: {
        model: 'news',
        key: 'news_id'
      }
    }
  }, {
    sequelize,
    tableName: 'news_tag_relationship',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "news_tag_relationship_pkey",
        unique: true,
        fields: [
          { name: "news_tag_relationship_id" },
        ]
      },
    ]
  });
  return news_tag_relationship;
  }
}
