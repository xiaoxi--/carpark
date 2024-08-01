import type { Sequelize, Model } from "sequelize";
import { carparks } from "./carparks";
import type { carparksAttributes, carparksCreationAttributes } from "./carparks";
import { favorites } from "./favorites";
import type { favoritesAttributes, favoritesCreationAttributes } from "./favorites";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  carparks,
  favorites,
  users,
};

export type {
  carparksAttributes,
  carparksCreationAttributes,
  favoritesAttributes,
  favoritesCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  carparks.initModel(sequelize);
  favorites.initModel(sequelize);
  users.initModel(sequelize);

  favorites.belongsTo(carparks, { as: "carpark", foreignKey: "carparks_id"});
  carparks.hasMany(favorites, { as: "favorites", foreignKey: "carparks_id"});
  favorites.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(favorites, { as: "favorites", foreignKey: "user_id"});

  return {
    carparks: carparks,
    favorites: favorites,
    users: users,
  };
}
