const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Middleware #1', req.url);
  next();
});

app.use((req, res, next) => {
  console.log('Middleware #2', req.url);
  next();
});

app.use('/users', (req, res) => {
  const message = 'Express Exercise: Users';
  res.send({ message });
});

app.use('/', (req, res) => {
  const message = 'Express Exercise: Home';
  res.send({ message });
});

app.listen(3000);
