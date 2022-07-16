const { StatusCodes } = require('http-status-codes');

/*
Example

{
  validationErrors: {
    username: 'Username cannot be empty',
    email: 'Email must be valid', 
  },
}
*/
const sendValidationErrors = (req, res, errors) => {
  return res.status(StatusCodes.BAD_REQUEST).send({
    validationErrors: errors.array().reduce((errs, err) => {
      errs[err.param] = req.t(err.msg);
      return errs;
    }, {}),
  });
};

module.exports = {
  sendValidationErrors,
};
