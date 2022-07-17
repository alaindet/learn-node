const { StatusCodes } = require('http-status-codes');
const { check, validationResult } = require('express-validator');

const { sendValidationErrors } = require('../../common/validation-errors');
const fromService = require('../users.service');
const fromValidators = require('../validators/user-email-exists');

const validateUsername = check('username')
  .notEmpty()
  .withMessage('validation.usernameEmpty')
  .bail()
  .isLength({ min: 4, max: 32 })
  .withMessage('validation.usernameSize');

const validateEmail = check('email')
  .notEmpty()
  .withMessage('validation.emailEmpty')
  .bail()
  .isEmail()
  .withMessage('validation.emailValid')
  .bail()
  .custom(fromValidators.userEmailExists);

const validatePassword = check('password')
  .notEmpty()
  .withMessage('validation.passwordEmpty')
  .bail()
  .isLength({ min: 6 })
  .withMessage('validation.passwordSize')
  .bail()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*?$/)
  .withMessage('validation.passwordPattern');

const validate = [
  validateUsername,
  validateEmail,
  validatePassword,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return sendValidationErrors(req, res, errors);
  },
];

const handle = async (req, res) => {
  try {
    await fromService.createUser(req.body);
    const message = req.t('users.createdSuccess');
    return res.status(StatusCodes.CREATED).send({ message });
  }
  
  // Note: 502 Bad Gateway implies the email server did not work
  catch(err) {
    const message = req.t(err.message);
    return res.status(StatusCodes.BAD_GATEWAY).send({ message });
  }
};

module.exports = [
  ...validate,
  handle,
];
