const { StatusCodes } = require('http-status-codes');
const { check, validationResult } = require('express-validator');

const fromService = require('../users.service');

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
  .withMessage('Email must be valid');
  // ...

const validatePassword = check('password')
  .notEmpty()
  .withMessage('Password cannot be empty')
  .bail()
  .isLength({ min: 6 })
  .withMessage('Password must have min 6 characters')
  .bail()
  .matches(/^?=.*[a-z](?=[A-Z])(?=.*[0-9]).*?$/)
  .withMessage('Password must have 1+ uppercase, 1+ lowercase and 1+ numbers')

const validate = [
  validateUsername,
  validateEmail,
  validatePassword,
  (req, res, next) => {
    const err = validationResult(req);
    if (err.isEmpty()) return next();
    const validationErrors = {};
    err.array().forEach(e => validationErrors[e.param] = e.msg);
    return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors });
  },
];

const handle = async (req, res) => {
  await fromService.createUser(req.body);
  return res.status(StatusCodes.CREATED).send({ message: 'User created' });
};

const createUser = [
  ...validate,
  handle,
];

module.exports = { createUser };
