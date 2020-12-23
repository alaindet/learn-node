const fs = require('fs');
const path = require('path');

const CART_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json',
);

const getCartFromFile = (callback) => {
  fs.readFile(CART_PATH, (error, fileContent) => {
    if (error) {
      callback({
        products: [],
        totalPrice: 0,
      });
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

const writeCartIntoFile = (cart, callback) => {
  fs.writeFile(CART_PATH, JSON.stringify(cart), (error) => {
    if (error) {
      console.error(error);
      return;
    }
    if (callback) {
      callback();
    }
  });
};

module.exports = class Cart {

  static getCart(callback) {
    getCartFromFile(cart => {
      callback(cart);
    });
  }

  static addProduct(id, price) {
    getCartFromFile(cart => {
      const productIndex = cart.products.findIndex(product => product.id === id);
      const product = cart.products[productIndex];
      if (product) {
        const updatedProduct = {...product};
        updatedProduct.qty += 1;
        cart.products[productIndex] = updatedProduct;
      } else {
        const updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += Number(price);
      writeCartIntoFile(cart);
    });
  }

  static deleteProduct(id, price, callback) {
    getCartFromFile(cart => {
      const product = cart.products.find(product => product.id === id);
      if (!product) {
        return;
      }
      const updatedCart = {
        ...cart,
        totalPrice: cart.totalPrice - (Number(product.qty) * Number(price)),
        products: cart.products.filter(product => product.id !== id),
      };
      writeCartIntoFile(updatedCart, callback);
    });
  }
}
