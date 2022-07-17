const bcrypt = require('bcrypt');
const crypto = require('crypto');

const sequelize = require('../config/database');
const emailService = require('../email/email.service');
const { User } = require('./user.model');
const emailException = require('../email/email.exception');

const generateActivationToken = len => {
  return crypto.randomBytes(len).toString('hex').substring(0, len);
};

const createUser = async (body) => {
  const password = await bcrypt.hash(body.password, 10);
  const inactive = true;
  const activationToken = generateActivationToken(16);
  const user = { ...body, password, inactive, activationToken };
  const transaction = await sequelize.transaction();
  try {
    await User.create(user, { transation });
    await emailService.sendAccountActivation(user.email, user.activationToken);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new emailException('users.activationEmailError');
  }
};

const findByEmail = async email => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findByEmail,
};
