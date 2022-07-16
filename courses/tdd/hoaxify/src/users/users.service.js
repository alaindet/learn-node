const bcrypt = require('bcrypt');
const crypto = require('crypto');

const emailService = require('../email/email.service');
const { User } = require('./user.model');

const generateActivationToken = len => {
  return crypto.randomBytes(len).toString('hex').substring(0, len);
};

const createUser = async (body) => {
  const password = await bcrypt.hash(body.password, 10);
  const inactive = true;
  const activationToken = generateActivationToken(16);
  const user = { ...body, password, inactive, activationToken };
  await User.create(user);
  await emailService.sendAccountActivation(user.email, user.activationToken);
};

const findByEmail = async email => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findByEmail,
};
