const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const { products } = require('./admin');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/shop', {
    title: 'Products',
    products,
  });
});

module.exports = router;
