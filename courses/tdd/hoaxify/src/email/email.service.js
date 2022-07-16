const nodemailer = require('nodemailer');
const nodemailerStub = require('nodemailer-stub');
const config = require('config');

const { transporter } = require('../config/email');

const sendAccountActivation = async (email, activationToken) => {
  const { fromName, fromEmail } = config.get('email');
  const { name } = config.get('app');
  await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: email,
    subject: `${name} Account Activation`,
    html: `Token is ${activationToken}`,
  });
};

module.exports = {
  sendAccountActivation,
};
