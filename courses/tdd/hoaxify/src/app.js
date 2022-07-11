const express = require('express');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const User = require('./user/user');

const app = express();
app.use(express.json());

app.post('/api/1.0/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const dtoIn = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  
  await User.create(dtoIn);

  const dtoOut = {
    message: 'User created',
  };

  return res.status(StatusCodes.CREATED).send(dtoOut);
});

module.exports = app;
