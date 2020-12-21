const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render('pages/404', {
    title: 'Page not found'
  });
});

app.listen(3000);
