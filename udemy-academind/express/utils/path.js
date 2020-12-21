const path = require('path');

const ROOT = path.dirname(process.mainModule.filename);

module.exports = {
  ROOT,
  VIEWS: path.join(ROOT, 'views'),
};
