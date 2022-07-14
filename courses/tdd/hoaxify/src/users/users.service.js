const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require('./user.model');

const generateToken = len => {
  return crypto.randomBytes(len).toString('hex').substring(0, len);
};

const createUser = async (body) => {
  const password = await bcrypt.hash(body.password, 10);
  const inactive = true;
  const activationToken = generateToken(16);
  await User.create({ ...body, password, inactive, activationToken });
};

const findByEmail = async email => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findByEmail,
};
