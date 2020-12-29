const express = require('express');
const setJsonResponse = require('./middlewares/set-json-response');
const feedRoutes = require('./routes/feed');
const addCorsHeaders = require('./middlewares/add-cors-headers');

const app = express();

// Middlewares
app.use(setJsonResponse);
app.use(addCorsHeaders);

// Routes
app.use('/feed', feedRoutes);

// Boot
app.listen(8080);
