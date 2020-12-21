const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const { products } = require('./admin');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/shop', {
    title: 'Products',
    css: {
      forms: false,
      product: true,
    },
    active: {
      shop: true,
      product: false,
    },
    products,
    hasProducts: products.length > 0,
    // layout: false, // To disable using default layout
  });
});

module.exports = router;
