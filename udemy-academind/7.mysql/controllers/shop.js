const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.error('Could not fetch products', err));
};

exports.getProduct = (req, res) => {

  const id = req.params.id;

  // // Alternative
  // Product.findAll({ where: { id } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       pageTitle: `Product details: ${id}`,
  //       path: '/products',
  //       product: products[0],
  //     });
  //   })
  //   .catch(err => console.error('Could not fetch product', err));

  Product.findByPk(id)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: `Product details: ${id}`,
        path: '/products',
        product,
      });
    })
    .catch(err => console.error('Could not fetch product', err));
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.error('Could not fetch products', err));
};

exports.getCart = (req, res) => {
  req.user.getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => console.log('Could not fetch the cart', err));
};

exports.postDeleteCartProduct = (req, res) => {
  const id = req.body.id;
  req.user.getCart()
    .then(cart => cart.getProducts({ where: { id } }))
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => res.redirect('/cart'))
    .catch(err => console.log('Could not fetch the cart', err));
};

exports.postCart = (req, res) => {
  const id = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id } });
    })
    .then(products => {
      if (!products.length) {
        return Product.findByPk(id)
      }
      const product = products[0];
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    })
    .then(product => fetchedCart.addProduct(product, {
      through: { quantity: newQuantity }
    }))
    .then(() => res.redirect('/cart'))
    .catch(err => console.log('Could not fetch the cart', err));
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
