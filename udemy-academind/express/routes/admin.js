const express = require('express');

const router = express.Router();

router.get('/products/create', (req, res) => {
  res.send(`
    <h1>Create a new product</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
    </ul>
    <hr>
    <form action="/admin/products" method="POST">
      <input type="text" name="title">
      <button type="submit">Create</button>
    </form>
  `);
});

router.post('/products', (req, res) => {
  console.log(req.body);
  res.redirect('/products');
});

module.exports = router;
