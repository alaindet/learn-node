const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res) => {
  res.render('admin/product-form', {
    pageTitle: 'Add Product',
    action: 'create',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res) => {
  Product.findById(req.params.id, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/product-form', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      action: 'edit',
      product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const id = req.body.id;
  const updatedProduct = new Product(
    req.body.id || null,
    req.body.title || null,
    req.body.imageUrl || null,
    req.body.description || null,
    req.body.price || null,
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getDeleteProduct = (req, res) => {
  Product.findById(req.params.id, product => {
    if (!product) {
      return res.redirect('/admin/products');
    }
    res.render('admin/product-form', {
      pageTitle: 'Delete Product',
      path: '/admin/edit-product',
      action: 'delete',
      product,
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  Product.deleteById(req.body.id, (product) => {
    Cart.deleteProduct(product.id, product.price, () => {
      res.redirect('/admin/products');
    });
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
