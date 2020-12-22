const Product = require('../models/product');
const Cart = require('../models/cart');

// Private
const getProductsInCart = (cartProducts, products) => {
  let result = [];
  for (const cartProduct of cartProducts) {
    const product = products.find(aProduct => aProduct.id === cartProduct.id);
    result = [...result, {
      product: product,
      qty: cartProduct.qty,
    }];
  }
  return result;
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      pageTitle: 'All Products',
      path: '/products',
      prods: products,
    });
  });
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  Product.findById(id, product => {
    res.render('shop/product-detail', {
      pageTitle: `Product details: ${id}`,
      path: '/products',
      product,
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: getProductsInCart(cart.products, products),
      });
    });
  });
};

exports.postDeleteCartProduct = (req, res) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.deleteProduct(product.id, product.price, () => {
      res.redirect('/cart');
    });
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
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
