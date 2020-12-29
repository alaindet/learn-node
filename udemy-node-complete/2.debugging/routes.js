const fs = require('fs');
const outputHtml = require('./utils/output-html');

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    const content = `
      <form action="/message" method="POST">
        <input 
          type="text"
          name="message"
          placeholder="Enter a message..."
        >
        <button type="submit">Submit</button>
      </form>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.write(outputHtml(content));
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
      const message = parsedBody.split('=')[0]; // <== ERROR!
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  // Not found
  const content = `
    <p>404 Page not found</p>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.write(outputHtml(content));
  return res.end();
};

module.exports = requestHandler;
