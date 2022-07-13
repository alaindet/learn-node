const config = require('config');

const db = require('./config/database');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  db.sync({ force: true });
}

const name = config.get('app').name;
const port = config.get('api').port;

app.listen(port, () => console.log(`${name} is running on port ${port}`));
