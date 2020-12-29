const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const PRODUCTS_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const writeProductsIntoFile = (products, callback) => {
  fs.writeFile(PRODUCTS_PATH, JSON.stringify(products), (error) => {
    if (error) {
      console.error(error);
      return;
    }
    if (callback) {
      callback();
    }
  });
};

const getProductsFromFile = (callback) => {
  fs.readFile(PRODUCTS_PATH, (error, fileContent) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {

  constructor(id = null, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {

      // Update existing product
      if (this.id) {
        const existingProductIndex = products.findIndex(
          product => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        writeProductsIntoFile(updatedProducts);
        return;
      }

      // Create a new one
      this.id = (Math.random() * 100).toString(); // TODO
      products.push(this);
      writeProductsIntoFile(products);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      callback(product);
    });
  }

  static deleteById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      writeProductsIntoFile(updatedProducts, () => {
        callback(product);
      });
    });
  }
};
