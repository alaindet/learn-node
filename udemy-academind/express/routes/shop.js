const express = require('express');
const path = require('path');

const { VIEWS } = require('../utils/path');

const router = express.Router();

router.get('/products', (req, res) => {
  res.sendFile(path.join(VIEWS, 'products.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(VIEWS, 'home.html'));
});

module.exports = router;
