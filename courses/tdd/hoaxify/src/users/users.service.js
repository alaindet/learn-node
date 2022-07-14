const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerStub = require('nodemailer-stub');
const config = require('config');

const { User } = require('./user.model');

const generateToken = len => {
  return crypto.randomBytes(len).toString('hex').substring(0, len);
};

const createUser = async (body) => {
  const password = await bcrypt.hash(body.password, 10);
  const inactive = true;
  const activationToken = generateToken(16);
  await User.create({ ...body, password, inactive, activationToken });

  // TODO: Only in development
  // TODO: Move to function
  const { fromName, fromEmail } = config.get('email');
  const { name } = config.get('app');
  const transporter = nodemailer.createTransport(nodemailerStub.stubTransport);
  await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: body.email,
    subject: `${name} Account Activation`,
    html: `Token is ${activationToken}`,
  });
};

const findByEmail = async email => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findByEmail,
};
