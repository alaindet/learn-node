const fs = require('fs');
const outputHtml = require('./utils/output-html');

const usersFilePath = './data/users.json';

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  // GET /
  if (method === 'GET' && url === '/') {
    const html = outputHtml(`
      <h1>Users</h1>
      <a href="/users">List</a>
      <hr>
      <h2>Create a new user</h2>
      <form method="POST" action="/users">
        <input
          type="text"
          name="username"
          placeholder="Create new user..."
        >
        <button type="submit">Create</button>
      </form>
    `);
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    return res.end();
  }

  // POST /users
  if (method === 'POST' && url === '/users') {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      fs.readFile(usersFilePath, (error, data) => {
        if (error) {
          console.log('Could not read users file');
          throw error;
        }
        let users = JSON.parse(data);
        users.push(user);
        const usersJson = JSON.stringify(users, null, 2);
        fs.writeFile(usersFilePath, usersJson, (error) => {
          if (error) {
            console.log('Could not write to users file');
            throw error;
          }
          console.log('User created');
          res.statusCode = 302;
          res.setHeader('Location', '/users');
          return res.end();
        });
      });
    });
  }

  // GET /users
  if (method === 'GET' && url === '/users') {
    const usersFile = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersFile);
    const html = outputHtml(`
      <h1>Users</h1>
      <a href="/">Create</a>
      <hr>
      <h2>Users list</h2>
      <ul>` +
        users.map(user => (`
          <li>
            <strong>Name</strong>: ${user}
          </li>
        `)).join('') +
      `</ul>
    `);
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    return res.end();
  }

  // Not found
  const html = outputHtml('404 page not found');
  res.setHeader('Content-Type', 'text/html');
  res.write(html);
  return res.end();
};

module.exports = requestHandler;
