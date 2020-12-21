const express = require('express');
const LINKS = require('../data/link');
const PRODUCTS = require('../data/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.render('pages/add-product', {
    title: 'Add Product',
    navigation: LINKS,
    path: '/admin/add-product',
    stylesheets: [
      '/css/forms.css',
      '/css/product.css',
    ],
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
  PRODUCTS.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = router;
