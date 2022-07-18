const nodemailer = require('nodemailer');
const config = require('config');

const { host, port } = config.get('email');

const transporter = nodemailer.createTransport({
  host,
  port: +port,
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  transporter,
};
