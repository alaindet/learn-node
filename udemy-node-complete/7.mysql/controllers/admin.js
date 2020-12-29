const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  req.user.getProducts()
    // Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.error('Could not fetch products', err));
};

exports.getAddProduct = (req, res) => {
  res.render('admin/product-form', {
    pageTitle: 'Add Product',
    action: 'create',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  // Magic method from Sequelize based on associations
  req.user.createProduct({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  })
  // // Equivalent to
  // Product.create({
  //   title: req.body.title,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   description: req.body.description,
  //   userId: req.user.id,
  // })
  .then(() => res.redirect('/'))
  .catch(error => console.error('Could not create new product', error));
};

exports.getEditProduct = (req, res) => {
  req.user.getProducts({ where: { id: req.params.id } })
    .then(products => products[0])
    // Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/product-form', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        action: 'edit',
        product,
      });
    })
    .catch(err => {
      console.err('Could not fetch product', err);
      return res.redirect('/');
    });
};

exports.postEditProduct = (req, res) => {
  Product.findByPk(req.body.id)
    .then(product => {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    })
    .catch(err => console.error(err))
    .finally(() => res.redirect('/admin/products'))
};

exports.getDeleteProduct = (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) {
        return res.redirect('/admin/products');
      }
      res.render('admin/product-form', {
        pageTitle: 'Delete Product',
        path: '/admin/edit-product',
        action: 'delete',
        product,
      });
    })
    .catch(err => {
      console.error('Could not fetch the product', err);
      return res.redirect('/admin/products');
    });
};

exports.postDeleteProduct = (req, res) => {
  Product.findByPk(req.body.id)
    .then(product => product.destroy())
    .catch(err => console.error(err))
    .finally(() => res.redirect('/admin/products'));
};
