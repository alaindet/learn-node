const express = require('express');

const app = express();

app.use((request, response, next) => {
  console.log('First middleware');
  next();
});

app.use((request, response, next) => {
  console.log('Second middleware');
  next();
});

app.get('/', (request, response) => {
  response.send('Hello World');
});

module.exports = app;
