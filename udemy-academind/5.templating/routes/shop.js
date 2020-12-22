const express = require('express');
const LINKS = require('../data/links');
const PRODUCTS = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/shop', {
    page: {
      title: 'Products',
      navigation: LINKS,
      path: '/',
      stylesheets: [
        '/css/product.css',
      ],
    },
    products: PRODUCTS,
  });
});

module.exports = router;
