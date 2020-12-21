const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('Hooked into the system', req.url);
  next();
});

app.use('/products', (req, res, next) => {
  res.send('<h1>Products</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);
