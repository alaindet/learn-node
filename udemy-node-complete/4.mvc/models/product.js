const fs = require('fs');
const path = require('path');
const ROOT_DIR = require('../util/path');

const PRODUCTS_PATH = path.join(ROOT_DIR, 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(PRODUCTS_PATH, (error, data) => {
    const products = (error || !data) ? [] : JSON.parse(data);
    callback(products);
  });
};

module.exports = class Product {

  constructor(title) {
    this.title = title;
  }

  save() {
    const product = this;
    getProductsFromFile((products) => {
      products.push(product);
      const output = JSON.stringify(products);
      fs.writeFile(PRODUCTS_PATH, output, (error) => {
        if (error) {
          console.error(error);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}
