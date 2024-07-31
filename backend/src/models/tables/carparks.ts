import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { favorites, favoritesId } from './favorites';

export interface carparksAttributes {
  carparks_id: number;
  car_park_no: string;
  address: string;
  x_coord: number;
  y_coord: number;
  car_park_type: string;
  type_of_parking_system: string;
  short_term_parking: string;
  free_parking: string;
  night_parking: boolean;
  car_park_decks?: number;
  gantry_height?: number;
  car_park_basement: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type carparksPk = "carparks_id";
export type carparksId = carparks[carparksPk];
export type carparksCreationAttributes = Optional<carparksAttributes, carparksPk>;

export class carparks extends Model<carparksAttributes, carparksCreationAttributes> implements carparksAttributes {
  carparks_id!: number;
  car_park_no!: string;
  address!: string;
  x_coord!: number;
  y_coord!: number;
  car_park_type!: string;
  type_of_parking_system!: string;
  short_term_parking!: string;
  free_parking!: string;
  night_parking!: boolean;
  car_park_decks?: number;
  gantry_height?: number;
  car_park_basement!: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // carparks hasMany favorites via carparks_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof carparks {
    carparks.init({
    carparks_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "停车场id",
      primaryKey: true
    },
    car_park_no: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "停车场编号",
      unique: "carparks_car_park_no_key"
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "地址"
    },
    x_coord: {
      type: DataTypes.REAL,
      allowNull: false,
      comment: "x坐标"
    },
    y_coord: {
      type: DataTypes.REAL,
      allowNull: false,
      comment: "y坐标"
    },
    car_park_type: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "停车场类型"
    },
    type_of_parking_system: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "停车系统类型"
    },
    short_term_parking: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "短期停车"
    },
    free_parking: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "是否提供免费停车"
    },
    night_parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "是否提供夜间停车（Y\/N）"
    },
    car_park_decks: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "停车层数"
    },
    gantry_height: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "闸门高度（米）"
    },
    car_park_basement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: " 是否为地下停车场（Y\/N）"
    }
  }, {
    sequelize,
    tableName: 'carparks',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "carparks_car_park_no_key",
        unique: true,
        fields: [
          { name: "car_park_no" },
        ]
      },
      {
        name: "carparks_pkey",
        unique: true,
        fields: [
          { name: "carparks_id" },
        ]
      },
    ]
  });
  return carparks;
  }
}
