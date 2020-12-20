const http = require('http');

const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');

  [
    '<html>',
    '<head><title>Node.js demo</title></head>',
    '<body>Hello world</body>',
    '</html>',
  ].map(line => res.write(line));
  res.end();

});

server.listen(3000);
