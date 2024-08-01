import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { carparks, carparksId } from './carparks';
import type { users, usersId } from './users';

export interface favoritesAttributes {
  favorites_id: number;
  carparks_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type favoritesPk = "favorites_id";
export type favoritesId = favorites[favoritesPk];
export type favoritesCreationAttributes = Optional<favoritesAttributes, favoritesPk>;

export class favorites extends Model<favoritesAttributes, favoritesCreationAttributes> implements favoritesAttributes {
  favorites_id!: number;
  carparks_id!: number;
  user_id!: number;
  createdAt?: Date;
  updatedAt?: Date;

  // favorites belongsTo carparks via carparks_id
  carpark!: carparks;
  getCarpark!: Sequelize.BelongsToGetAssociationMixin<carparks>;
  setCarpark!: Sequelize.BelongsToSetAssociationMixin<carparks, carparksId>;
  createCarpark!: Sequelize.BelongsToCreateAssociationMixin<carparks>;
  // favorites belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof favorites {
    favorites.init({
    favorites_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "收藏ID",
      primaryKey: true
    },
    carparks_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "停车场id",
      references: {
        model: 'carparks',
        key: 'carparks_id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID",
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'favorites',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "favorites_pkey",
        unique: true,
        fields: [
          { name: "favorites_id" },
        ]
      },
    ]
  });
  return favorites;
  }
}
