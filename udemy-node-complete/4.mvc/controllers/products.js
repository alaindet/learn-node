const LINKS = require('../data/links');
const Product = require('../models/product');

module.exports.getAddProduct = (req, res) => {
  res.render('pages/add-product', {
    page: {
      title: 'Add Product',
      navigation: LINKS,
      path: '/admin/add-product',
      stylesheets: [
        '/css/forms.css',
        '/css/product.css',
      ],
    }
  });
};

module.exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

module.exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('pages/shop', {
      page: {
        title: 'Products',
        navigation: LINKS,
        path: '/',
        stylesheets: [
          '/css/product.css',
        ],
      },
      products: products,
    });
  });
};
