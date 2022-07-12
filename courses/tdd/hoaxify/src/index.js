const db = require('./config/database');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  db.sync();
}

// TODO: Move into .env
const APP_NAME = 'Hoaxify';
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});
