const { DataTypes } = require('sequelize');

const Simulacra = (sequelize) => {
  const _Simulacra = sequelize.define('Simulacra', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    simulacraImg: DataTypes.STRING,
    weapon: DataTypes.STRING,
    weaponImg: DataTypes.STRING,
    name: DataTypes.STRING,
    rarity: DataTypes.ENUM("SSR", "SR", "R", "N"),
    element: DataTypes.ENUM("flame", "ice", 'volt', 'physical', 'aberration'),
    type: DataTypes.ENUM("dps", 'support', 'defense'),
    baseStats: DataTypes.JSON,
    shatter: DataTypes.JSON,
    charge: DataTypes.JSON,
    materials: DataTypes.JSON,
    effect: DataTypes.JSON,
    advancement: DataTypes.JSON,
    awakening: DataTypes.JSON,
    gifts: DataTypes.JSON
  });

  return _Simulacra;
};

module.exports = Simulacra;
