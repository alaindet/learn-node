const express = require('express');
const sequelize = require('./util/database');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const encodeRequestBody = require('./middlewares/encode-request-body');
const attachUserToRequest = require('./middlewares/attach-user-to-request');
const serveStaticFiles = require('./middlewares/serve-static-files');
const { initUserIfNone, initAssociations } = require('./util/database-init');

const app = express();

// Set templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(encodeRequestBody);
app.use(serveStaticFiles);
app.use(attachUserToRequest);

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

initAssociations();

// Creates tables and relations if needed
// sequelize.sync({ force: true }) // Refresh database structure
sequelize.sync()
  .then(initUserIfNone)
  .then(() => app.listen(3000))
  .catch(error => console.error('Could not sync database', error));
