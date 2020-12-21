const express = require('express');

const router = express.Router();

router.get('/products', (req, res) => {
  res.send(`
    <h1>Products</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/admin/products/create">Create product</a></li>
    </ul>
    <hr>
  `);
});

router.get('/', (req, res) => {
  res.send(`
    <h1>Home</h1>
    <ul>
      <li><a href="/admin/products/create">Create product</a></li>
      <li><a href="/products">Products</a></li>
    </ul>
  `);
});

module.exports = router;
