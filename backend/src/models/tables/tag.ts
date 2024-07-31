import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { news_tag_relationship, news_tag_relationshipId } from './news_tag_relationship'

export interface tagAttributes {
    tag_id: number
    user_id: number
    tag: string
    comment?: string
    createdAt?: Date
    updatedAt?: Date
}

export type tagPk = 'tag_id'
export type tagId = tag[tagPk]
export type tagCreationAttributes = Optional<tagAttributes, tagPk>

export class tag extends Model<tagAttributes, tagCreationAttributes> implements tagAttributes {
    tag_id!: number
    user_id!: number
    tag!: string
    comment?: string
    createdAt?: Date
    updatedAt?: Date

    // tag hasMany news_tag_relationship via tag_id
    news_tag_relationships!: news_tag_relationship[]
    getNews_tag_relationships!: Sequelize.HasManyGetAssociationsMixin<news_tag_relationship>
    setNews_tag_relationships!: Sequelize.HasManySetAssociationsMixin<news_tag_relationship, news_tag_relationshipId>
    addNews_tag_relationship!: Sequelize.HasManyAddAssociationMixin<news_tag_relationship, news_tag_relationshipId>
    addNews_tag_relationships!: Sequelize.HasManyAddAssociationsMixin<news_tag_relationship, news_tag_relationshipId>
    createNews_tag_relationship!: Sequelize.HasManyCreateAssociationMixin<news_tag_relationship>
    removeNews_tag_relationship!: Sequelize.HasManyRemoveAssociationMixin<news_tag_relationship, news_tag_relationshipId>
    removeNews_tag_relationships!: Sequelize.HasManyRemoveAssociationsMixin<news_tag_relationship, news_tag_relationshipId>
    hasNews_tag_relationship!: Sequelize.HasManyHasAssociationMixin<news_tag_relationship, news_tag_relationshipId>
    hasNews_tag_relationships!: Sequelize.HasManyHasAssociationsMixin<news_tag_relationship, news_tag_relationshipId>
    countNews_tag_relationships!: Sequelize.HasManyCountAssociationsMixin

    static initModel(sequelize: Sequelize.Sequelize): typeof tag {
        tag.init(
            {
                tag_id: {
                    autoIncrement: true,
                    autoIncrementIdentity: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    comment: '标签id',
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    comment: '用户ID',
                },
                tag: {
                    type: DataTypes.STRING(128),
                    allowNull: false,
                    comment: '标签名称',
                },
                comment: {
                    type: DataTypes.STRING(128),
                    allowNull: true,
                    comment: '备注',
                },
            },
            {
                sequelize,
                tableName: 'tag',
                schema: 'public',
                timestamps: true,
                indexes: [
                    {
                        name: 'tag_pkey',
                        unique: true,
                        fields: [{ name: 'tag_id' }],
                    },
                ],
            }
        )
        return tag
    }
}
