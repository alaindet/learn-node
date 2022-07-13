const { StatusCodes } = require('http-status-codes');

const emailAlreadyInUse = (res) => {
  return res.status(StatusCodes.CONFLICT).send({
    validationErrors: {
      email: 'Email already in use',
    },
  });
};

const validation = (errors, res) => {
  const validationErrors = {};
  errors.array().forEach(err => validationErrors[err.param] = err.msg);
  return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors });
};

const generic = (res) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    messge: 'Something went wrong',
  });
};

module.exports = {
  emailAlreadyInUse,
  validation,
  generic,
};
