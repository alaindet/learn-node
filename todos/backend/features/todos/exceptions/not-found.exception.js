const DatabaseException = require('./database.exception');

class NotFoundException extends DatabaseException {
  // ...
}

module.exports = NotFoundException;
