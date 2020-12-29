const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded
const setJsonResponse = bodyParser.json(); // application/json

module.exports = setJsonResponse;
