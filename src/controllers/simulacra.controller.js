const { Op } = require('sequelize');
const { Simulacra } = require('../models');

const getSimulacrum = (name) => {
  return Simulacra.findOne({ where: { name: { [Op.like]: `%${name}%` } } });
};

exports.getSimulacrum = getSimulacrum;
