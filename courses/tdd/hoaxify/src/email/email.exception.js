const emailException = (message) => {
  return Error(message ?? 'email.sendFailure');
};

module.exports = {
  emailException,
};
