const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// Temporary
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('pages/add-product', {
    title: 'Add Product',
    css: {
      forms: true,
      product: true,
    },
    active: {
      shop: false,
      product: true,
    },
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = {
  router,
  products,
};
