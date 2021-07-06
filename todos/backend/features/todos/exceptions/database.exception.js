// Source
// https://rclayton.silvrback.com/custom-errors-in-node-js

class DatabaseException extends Error {
  constructor(message) {
    super(message);
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = DatabaseException;
