const Sequelize = require('sequelize');
const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = require('../env/env');

const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'mysql',
    host: DB_HOST,
  }
);

module.exports = sequelize;
