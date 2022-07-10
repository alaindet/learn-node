const app = require('./app');

const APP_NAME = 'Hoaxify';
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});
