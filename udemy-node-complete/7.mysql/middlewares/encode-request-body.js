const bodyParser = require('body-parser');

const encodeRequestBody = bodyParser.urlencoded({ extended: false });

module.exports = encodeRequestBody;
