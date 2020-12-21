const express = require('express');
const LINKS = require('../data/link');
const PRODUCTS = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/shop', {
    title: 'Products',
    navigation: LINKS,
    path: '/',
    stylesheets: [
      '/css/product.css',
    ],
    products: PRODUCTS,
  });
});

module.exports = router;
