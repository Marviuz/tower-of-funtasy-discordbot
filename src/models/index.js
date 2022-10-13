const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

sequelize
  .sync({ force: false })
  .then(() => console.log('Resynced'))
  .catch(console.error);

exports.sequelize = sequelize;
exports.Simulacra = require('./Simulacra.model')(sequelize);
