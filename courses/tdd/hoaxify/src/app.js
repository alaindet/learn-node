const express = require('express');
const i18next = require('i18next');
const FilesystemBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

const i18nCfg = require('./config/i18n');
const apiCfg = require('./config/api');
const usersRouter = require('./users/users.router');

// Bootstrap
const app = express();
i18next.use(FilesystemBackend).use(i18nextMiddleware.LanguageDetector).init(i18nCfg);

// Global middleware
app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());
// ...

// Routes
app.use(`${apiCfg.prefix}/users`, usersRouter);
// ...

module.exports = app;
