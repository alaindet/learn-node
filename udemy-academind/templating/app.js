const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const LINKS = require('./data/links');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Template engine: ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Not found
app.use((req, res, next) => {
  res.render('pages/404', {
    page: {
      title: 'Page not found',
      navigation: LINKS,
      path: null,
    },
  });
});

app.listen(3000);
