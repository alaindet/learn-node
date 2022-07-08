const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorsController = require('./controllers/errors');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Template engine: ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorsController.getNotFound);

app.listen(3000);
