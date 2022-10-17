const { Op } = require('sequelize');
const { Matrices } = require('../models');

const getMatrix = (name) => Matrices.findOne({ where: { matrixName: { [Op.like]: `%${name}%` } } });

exports.getMatrix = getMatrix;
