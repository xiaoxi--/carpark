import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { n_target_org, n_target_orgId } from './n_target_org'
import type { n_target_org_group, n_target_org_groupId } from './n_target_org_group'
import type { n_target_person, n_target_personId } from './n_target_person'
import type { news_tag_relationship, news_tag_relationshipId } from './news_tag_relationship'

export interface newsAttributes {
    news_id: number
    title: string
    description?: string
    content?: string
    cover?: string
    publisher_user_id: number
    views?: number
    audit_state?: '0' | '1' | '2' | '3'
    available: boolean
    createdBy: number
    createdAt?: Date
    updatedAt?: Date
}

export type newsPk = 'news_id'
export type newsId = news[newsPk]
export type newsCreationAttributes = Optional<newsAttributes, newsPk>

export class news extends Model<newsAttributes, newsCreationAttributes> implements newsAttributes {
    news_id!: number
    title!: string
    description?: string
    content?: string
    cover?: string
    publisher_user_id!: number
    views?: number
    audit_state?: '0' | '1' | '2' | '3'
    available!: boolean
    createdBy!: number
    createdAt?: Date
    updatedAt?: Date

    // news hasMany n_target_org via news_id
    n_target_orgs!: n_target_org[]
    getN_target_orgs!: Sequelize.HasManyGetAssociationsMixin<n_target_org>
    setN_target_orgs!: Sequelize.HasManySetAssociationsMixin<n_target_org, n_target_orgId>
    addN_target_org!: Sequelize.HasManyAddAssociationMixin<n_target_org, n_target_orgId>
    addN_target_orgs!: Sequelize.HasManyAddAssociationsMixin<n_target_org, n_target_orgId>
    createN_target_org!: Sequelize.HasManyCreateAssociationMixin<n_target_org>
    removeN_target_org!: Sequelize.HasManyRemoveAssociationMixin<n_target_org, n_target_orgId>
    removeN_target_orgs!: Sequelize.HasManyRemoveAssociationsMixin<n_target_org, n_target_orgId>
    hasN_target_org!: Sequelize.HasManyHasAssociationMixin<n_target_org, n_target_orgId>
    hasN_target_orgs!: Sequelize.HasManyHasAssociationsMixin<n_target_org, n_target_orgId>
    countN_target_orgs!: Sequelize.HasManyCountAssociationsMixin
    // news hasMany n_target_org_group via news_id
    n_target_org_groups!: n_target_org_group[]
    getN_target_org_groups!: Sequelize.HasManyGetAssociationsMixin<n_target_org_group>
    setN_target_org_groups!: Sequelize.HasManySetAssociationsMixin<n_target_org_group, n_target_org_groupId>
    addN_target_org_group!: Sequelize.HasManyAddAssociationMixin<n_target_org_group, n_target_org_groupId>
    addN_target_org_groups!: Sequelize.HasManyAddAssociationsMixin<n_target_org_group, n_target_org_groupId>
    createN_target_org_group!: Sequelize.HasManyCreateAssociationMixin<n_target_org_group>
    removeN_target_org_group!: Sequelize.HasManyRemoveAssociationMixin<n_target_org_group, n_target_org_groupId>
    removeN_target_org_groups!: Sequelize.HasManyRemoveAssociationsMixin<n_target_org_group, n_target_org_groupId>
    hasN_target_org_group!: Sequelize.HasManyHasAssociationMixin<n_target_org_group, n_target_org_groupId>
    hasN_target_org_groups!: Sequelize.HasManyHasAssociationsMixin<n_target_org_group, n_target_org_groupId>
    countN_target_org_groups!: Sequelize.HasManyCountAssociationsMixin
    // news hasMany n_target_person via news_id
    n_target_people!: n_target_person[]
    getN_target_people!: Sequelize.HasManyGetAssociationsMixin<n_target_person>
    setN_target_people!: Sequelize.HasManySetAssociationsMixin<n_target_person, n_target_personId>
    addN_target_person!: Sequelize.HasManyAddAssociationMixin<n_target_person, n_target_personId>
    addN_target_people!: Sequelize.HasManyAddAssociationsMixin<n_target_person, n_target_personId>
    createN_target_person!: Sequelize.HasManyCreateAssociationMixin<n_target_person>
    removeN_target_person!: Sequelize.HasManyRemoveAssociationMixin<n_target_person, n_target_personId>
    removeN_target_people!: Sequelize.HasManyRemoveAssociationsMixin<n_target_person, n_target_personId>
    hasN_target_person!: Sequelize.HasManyHasAssociationMixin<n_target_person, n_target_personId>
    hasN_target_people!: Sequelize.HasManyHasAssociationsMixin<n_target_person, n_target_personId>
    countN_target_people!: Sequelize.HasManyCountAssociationsMixin
    // news hasMany news_tag_relationship via news_id
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

    static initModel(sequelize: Sequelize.Sequelize): typeof news {
        news.init(
            {
                news_id: {
                    autoIncrement: true,
                    autoIncrementIdentity: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    comment: '咨讯id',
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING(256),
                    allowNull: false,
                    comment: '标题',
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    comment: '描述',
                },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    comment: '内容',
                },
                cover: {
                    type: DataTypes.STRING(500),
                    allowNull: true,
                    comment: '封面图片',
                },
                publisher_user_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    comment: '发布者用户ID',
                },
                views: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '浏览数',
                },
                audit_state: {
                    type: DataTypes.ENUM('0', '1', '2', '3'),
                    allowNull: false,
                    defaultValue: '0',
                    comment: '资讯审核状态(0待审核，1审核中，2通过，3未通过)',
                },
                available: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                    comment: '资讯状态(0未发布，1发布)',
                },
                createdBy: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    comment: '创建者id',
                },
            },
            {
                sequelize,
                tableName: 'news',
                schema: 'public',
                timestamps: true,
                indexes: [
                    {
                        name: 'news_pkey',
                        unique: true,
                        fields: [{ name: 'news_id' }],
                    },
                ],
            }
        )
        return news
    }
}
