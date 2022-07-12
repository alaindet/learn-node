const express = require('express');

const usersRouter = require('./users/users.router');

const app = express();

// Global middleware
app.use(express.json());

// Features
app.use('/api/1.0/users', usersRouter);

module.exports = app;
