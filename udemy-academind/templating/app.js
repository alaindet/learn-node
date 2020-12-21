const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Template engine: PUG
// app.set('view engine', 'pug');
// app.set('views', './views/pug');

// Template enging: Express Handlebars
app.engine('hbs', expressHandlebars({
  layoutsDir: './views/hbs/layouts/',
  defaultLayout: 'main',
  extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views/hbs');

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
