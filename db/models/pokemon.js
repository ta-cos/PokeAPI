"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pokemon.belongsToMany(models.Type, {
        through: "pokemon_types",
        foreignKey: "pokeId",
        otherKey: "typeId",
      });
    }
  }
  Pokemon.init(
    {
      number: DataTypes.INTEGER,
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      base_exp: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      desription: DataTypes.TEXT,
      versionId: DataTypes.INTEGER,
      moveId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pokemon",
    }
  );
  return Pokemon;
};
