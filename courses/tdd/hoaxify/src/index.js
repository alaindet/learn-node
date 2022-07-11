const app = require('./app');
const db = require('./config/database');

if (process.env.NODE_ENV !== 'production') {
  db.sync();
}

const APP_NAME = 'Hoaxify';
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});
