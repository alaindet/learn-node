const express = require('express');

const usersRouter = require('./users/users.router');

console.log(`ENV: ${process.env.NODE_ENV}`);

const app = express();

// Global middleware
app.use(express.json());
// ...

// Features
app.use('/api/1.0/users', usersRouter);
// ...

module.exports = app;
