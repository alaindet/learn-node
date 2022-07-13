const bcrypt = require('bcrypt');

const { User } = require('./user.model');

const createUser = async (body) => {
  const password = await bcrypt.hash(body.password, 10);
  await User.create({ ...body, password });
};

const findByEmail = async email => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findByEmail,
};
