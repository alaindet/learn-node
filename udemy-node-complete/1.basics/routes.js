const fs = require('fs');

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    [
      '<html>',
      '<head><title>Node.js demo</title></head>',
      '<body>',
        '<form action="/message" method="POST">',
          '<input ',
            'type="text" ',
            'name="message" ',
            'placeholder="Enter a message..." ',
          '>',
          '<button type="submit">Submit</button>',
        '</form>',
      '</body>',
      '</html>',
    ].map(line => res.write(line));
    return res.end();
  }

  if (method === 'POST' && url === '/message') {
    const body = [];
    req.on('data', (chunk) => {
      console.log('chunk', chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  // Not found
  res.setHeader('Content-Type', 'text/html');
  [
    '<html>',
    '<head><title>Node.js demo</title></head>',
    '<body>',
      '404 Page not found',
    '</body>',
    '</html>',
  ].map(line => res.write(line));
  return res.end();
};

module.exports = requestHandler;
