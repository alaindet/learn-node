const Sequelize = require('sequelize');
const config = require('config');

const { name, username, password, storage, dialect, logs } = config.get('database');
const options = { dialect, storage, logging: logs };
const sequelize = new Sequelize(name, username, password, options);

module.exports = sequelize;
