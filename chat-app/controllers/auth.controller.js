const bcrypt = require('bcrypt');
const Model = require('../models');

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

    // Generate Auth token

    return res.json(user);
  }

  catch (error) {
    console.error(error);
    const message = 'An error occurred';
    return res.status(500).json({ message });
  }
};

const register = async (req, res) => {

  const { email, password } = req.body;

  return res.status(201).send({
    email,
    password,
  });
};

module.exports = {
  login,
  register,
};
