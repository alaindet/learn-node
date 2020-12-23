const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Set templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Parse incoming data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Creates tables and relations if needed
sequelize.sync()
  .then(() => app.listen(3000))
  .catch(error => console.error('Could not sync database', error));
