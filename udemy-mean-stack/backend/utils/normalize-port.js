const normalizePort = (rawPort) => {
  
  const port = parseInt(rawPort, 10);

  // Named pipe?
  if (isNaN(port)) {
    return rawPort;
  }

  // Port number
  if (port >= 0) {
    return port;
  }

  return null;
};

module.exports = normalizePort;
