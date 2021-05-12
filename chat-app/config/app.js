const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  appKey: process.env.APP_KEY,
  appName: process.env.APP_NAME,
  appPort: process.env.APP_PORT,
  appUrl: process.env.APP_URL,
};
