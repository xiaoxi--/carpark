import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { favorites, favoritesId } from './favorites';

export interface usersAttributes {
  user_id: number;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type usersPk = "user_id";
export type usersId = users[usersPk];
export type usersCreationAttributes = Optional<usersAttributes, usersPk>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  user_id!: number;
  username!: string;
  password!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // users hasMany favorites via user_id
  favorites!: favorites[];
  getFavorites!: Sequelize.HasManyGetAssociationsMixin<favorites>;
  setFavorites!: Sequelize.HasManySetAssociationsMixin<favorites, favoritesId>;
  addFavorite!: Sequelize.HasManyAddAssociationMixin<favorites, favoritesId>;
  addFavorites!: Sequelize.HasManyAddAssociationsMixin<favorites, favoritesId>;
  createFavorite!: Sequelize.HasManyCreateAssociationMixin<favorites>;
  removeFavorite!: Sequelize.HasManyRemoveAssociationMixin<favorites, favoritesId>;
  removeFavorites!: Sequelize.HasManyRemoveAssociationsMixin<favorites, favoritesId>;
  hasFavorite!: Sequelize.HasManyHasAssociationMixin<favorites, favoritesId>;
  hasFavorites!: Sequelize.HasManyHasAssociationsMixin<favorites, favoritesId>;
  countFavorites!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init({
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户ID",
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户名",
      unique: "users_username_key"
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "密码"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  return users;
  }
}
