const Sequelize = require('sequelize');

const DATABASE_NAME = 'hoaxify';
const DATABASE_USERNAME = 'my-db-name';
const DATABASE_PASSWORD = 'my-db-password';

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false,
  },
);

module.exports = sequelize;
