const express = require('express');
const path = require('path');

const { VIEWS_DIR } = require('../utils/path');

const router = express.Router();

router.get('/products/create', (req, res) => {
  res.sendFile(path.join(VIEWS_DIR, 'create-product.html'));
});

router.post('/products', (req, res) => {
  console.log(req.body);
  res.redirect('/products');
});

module.exports = router;
