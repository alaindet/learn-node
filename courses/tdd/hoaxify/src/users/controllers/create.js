const { StatusCodes } = require('http-status-codes');
const { check, validationResult } = require('express-validator');

const fromService = require('../users.service');

const validate = [
  check('username').notEmpty().withMessage('Username cannot be empty'),
  check('email').notEmpty().withMessage('Email cannot be empty'),
  check('password').notEmpty().withMessage('Password cannot be empty'),
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
