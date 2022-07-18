const emailException = (message) => {
  return new Error(message ?? 'email.sendFailure');
};

module.exports = {
  emailException,
};
