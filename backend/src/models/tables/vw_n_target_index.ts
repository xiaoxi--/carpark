import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface vw_n_target_indexAttributes {
    news_id?: number
    n_target_org_group?: number
    n_target_org?: number
    n_target_person?: number
}

export type vw_n_target_indexCreationAttributes = vw_n_target_indexAttributes

export class vw_n_target_index extends Model<vw_n_target_indexAttributes, vw_n_target_indexCreationAttributes> implements vw_n_target_indexAttributes {
    news_id?: number
    n_target_org_group?: number
    n_target_org?: number
    n_target_person?: number

    static initModel(sequelize: Sequelize.Sequelize): typeof vw_n_target_index {
        vw_n_target_index.init(
            {
                news_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    primaryKey: true,
                },
                n_target_org_group: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                n_target_org: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                n_target_person: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'vw_n_target_index',
                schema: 'public',
                timestamps: false,
            }
        )
        return vw_n_target_index
    }
}
