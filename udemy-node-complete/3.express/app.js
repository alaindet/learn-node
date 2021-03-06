const express = require('express');
const bodyParser = require('body-parser');
const { PUBLIC_DIR } = require('./utils/path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundRoute = require('./routes/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_DIR));

app.use(shopRoutes);
app.use('/admin', adminRoutes); // Add '/admin' prefix
app.use(notFoundRoute);

app.listen(3000);
