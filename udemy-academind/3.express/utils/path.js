const path = require('path');

const ROOT_DIR = path.dirname(process.mainModule.filename);

module.exports = {
  ROOT_DIR,
  VIEWS_DIR: path.join(ROOT_DIR, 'views'),
  PUBLIC_DIR: path.join(ROOT_DIR, 'public'),
};
