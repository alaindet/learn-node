const fromService = require('../users.service');

const userEmailExists = async email => {
  const exists = await fromService.findByEmail(email);
  if (exists) {
    throw new Error('validation.emailInUse');
  }
};

module.exports = {
  userEmailExists,
};
