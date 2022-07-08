const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

const initUserIfNone = () => {
  return User.findByPk(1) // TODO: hardcoded value
    .then(user => {
      if (!user) {
        return User.create({
          name: 'Alain',
          email: 'alain.det@gmail.com',
        });
      }
      // return Promise.resolve(user); // This is implicit
      return user;
    })
    .catch(error => console.error('Could not create user', error));
};

const initAssociations = () => {
  User.hasMany(Product);
  Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
  Order.belongsTo(User);
  User.hasMany(Order);
  Order.belongsToMany(Product, { through: OrderItem });
};

module.exports = {
  initUserIfNone,
  initAssociations,
};
