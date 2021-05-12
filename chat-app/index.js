const express = require('express');

const config = require('./config/app');
const router = require('./router/index');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// Startup...
app.listen(+config.appPort, () => {
  console.log(`${config.appName} started on port ${config.appPort}`);
});
