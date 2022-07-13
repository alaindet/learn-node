const express = require('express');

const createUser = require('./controllers/create');

const router = express.Router();

router.post('/', ...createUser);
// ...

module.exports = router;
