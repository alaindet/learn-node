const express = require('express');
const path = require('path');

const { VIEWS_DIR } = require('../utils/path');

const router = express.Router();

router.get('/products', (req, res) => {
  res.sendFile(path.join(VIEWS_DIR, 'products.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(VIEWS_DIR, 'home.html'));
});

module.exports = router;
