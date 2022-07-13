const { StatusCodes } = require('http-status-codes');

const validation = (req, res, errors) => {
  const validationErrors = {};
  const translate = req.t;

  errors.array().forEach(err => {
    validationErrors[err.param] = translate(err.msg);
  });

  return res.status(StatusCodes.BAD_REQUEST).send({
    validationErrors,
  });
};

module.exports = {
  validation,
};
