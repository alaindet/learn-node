const Sequelize = require('sequelize');

const db = require('../config/database');

class User extends Sequelize.Model {}

const attributes = {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  inactive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  activationToken: {
    type: Sequelize.STRING,
  },
};

const options = {
  sequelize: db,
  modelName: 'user',
};

User.init(attributes, options);

module.exports = { User };
