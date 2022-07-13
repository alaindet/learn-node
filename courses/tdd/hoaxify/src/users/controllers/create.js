const { StatusCodes } = require('http-status-codes');
const { check, validationResult } = require('express-validator');

const fromErrors = require('../error-responses');
const fromService = require('../users.service');
const fromValidators = require('../validators/user-email-exists');

const validateUsername = check('username')
  .notEmpty()
  .withMessage('Username cannot be empty')
  .bail()
  .isLength({ min: 4, max: 32 })
  .withMessage('Username must have min 4 and max 32 characters');

const validateEmail = check('email')
  .notEmpty()
  .withMessage('Email cannot be empty')
  .bail()
  .isEmail()
  .withMessage('Email must be valid')
  .bail()
  .custom(fromValidators.userEmailExists);
  // .withMessage('Email already in use');

const validatePassword = check('password')
  .notEmpty()
  .withMessage('Password cannot be empty')
  .bail()
  .isLength({ min: 6 })
  .withMessage('Password must have min 6 characters')
  .bail()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*?$/)
  .withMessage('Password must have 1+ uppercase, 1+ lowercase and 1+ numbers');

const validate = [
  validateUsername,
  validateEmail,
  validatePassword,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return fromErrors.validation(errors, res);
  },
];

const handle = async (req, res) => {
  try {
    await fromService.createUser(req.body);
    return res.status(StatusCodes.CREATED).send({ message: 'User created' });
  } catch (err) {
    const validationErrors = { email: err.message };
    return res.status(StatusCodes.CONFLICT).send({ validationErrors });
  }
};

const createUser = [
  ...validate,
  handle,
];

module.exports = {
  createUser,
};
