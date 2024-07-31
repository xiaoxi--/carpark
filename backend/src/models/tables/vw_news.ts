import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface vw_newsAttributes {
    news_id?: number
    title?: string
    description?: string
    news_tag_id_list?: string
    tag_list?: string
    tag_id_list?: string
    content?: string
    cover?: string
    publisher_user_id?: number
    views?: number
    audit_state?: '0' | '1' | '2' | '3'
    available?: boolean
    createdBy?: number
    createdAt?: Date
    updatedAt?: Date
}

export type vw_newsCreationAttributes = vw_newsAttributes

export class vw_news extends Model<vw_newsAttributes, vw_newsCreationAttributes> implements vw_newsAttributes {
    news_id?: number
    title?: string
    description?: string
    news_tag_id_list?: string
    tag_list?: string
    tag_id_list?: string
    content?: string
    cover?: string
    publisher_user_id?: number
    views?: number
    audit_state?: '0' | '1' | '2' | '3'
    available?: boolean
    createdBy?: number
    createdAt?: Date
    updatedAt?: Date

    static initModel(sequelize: Sequelize.Sequelize): typeof vw_news {
        vw_news.init(
            {
                news_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING(256),
                    allowNull: true,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                news_tag_id_list: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                tag_list: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                tag_id_list: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                cover: {
                    type: DataTypes.STRING(500),
                    allowNull: true,
                },
                publisher_user_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                views: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                audit_state: {
                    type: DataTypes.ENUM('0', '1', '2', '3'),
                    allowNull: true,
                },
                available: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                createdBy: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'vw_news',
                schema: 'public',
                timestamps: true,
            }
        )
        return vw_news
    }
}
