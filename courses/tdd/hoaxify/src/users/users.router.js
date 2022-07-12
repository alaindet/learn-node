const express = require('express');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const { User } = require('./user.model');

const router = express.Router();

// Register
router.post('/', async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password });
  return res.status(StatusCodes.CREATED).send({ message: 'User created' });
});

module.exports = router;
