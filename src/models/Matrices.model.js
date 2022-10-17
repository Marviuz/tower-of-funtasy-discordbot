const { DataTypes } = require('sequelize');

const Matrices = (sequelize) => {
  const _Matrices = sequelize.define('Matrices', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    matrixImg: DataTypes.STRING,
    matrixName: DataTypes.STRING,
    rarity: DataTypes.ENUM("SSR", "SR", "R", "N"),
    effect: DataTypes.JSON
  });

  return _Matrices;
};

module.exports = Matrices;
