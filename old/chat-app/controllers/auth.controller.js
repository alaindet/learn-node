const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/app');
const Model = require('../models');

const generateToken = user => {
  const { password, ...hashableUser } = user;
  const token = jwt.sign(hashableUser, config.appKey, { expiresIn: 86400 });
  return { ...hashableUser, token };
};

const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const where = { email };
    const queryOptions = { where };
    const user = await Model.User.findOne(queryOptions);

    if (!user) {
      const message = `No user found with email ${email}`;
      return res.status(404).json({ message });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      const message = 'Wrong password';
      return res.status(401).json({ message });
    }

    const userWithToken = generateToken(user.get({ raw: true }));
    return res.json(userWithToken);
  }

  catch (error) {
    console.error(error);
    const message = 'An error occurred';
    return res.status(500).json({ message });
  }
};

const register = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      favoritePokemon,
      avatar,
    } = req.body;

    const user = await Model.User.create({
      username,
      email,
      password,
      favoritePokemon,
      avatar,
    });

    const userWithToken = generateToken(user.get({ raw: true }));
    return res.json(userWithToken);
  }

  catch (error) {
    console.error(error);
    const message = 'An error occurred';
    return res.status(500).json({ message });
  }
};

module.exports = {
  login,
  register,
};
