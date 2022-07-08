const addCorsHeaders = (req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'example.com');
  // res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

module.exports = addCorsHeaders;
