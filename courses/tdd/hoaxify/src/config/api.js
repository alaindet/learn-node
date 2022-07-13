const config = require('config');

const { version } = config.get('api');
const prefix = `/api/${version}`;

module.exports = {
  prefix,
};
