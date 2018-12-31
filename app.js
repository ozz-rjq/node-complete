const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const rootDir = require('./util/path');

const app = express();

// app.set(name, value) allows us to set any value globally in our express application
app.set('view engine', 'pug');
// this is set automatically if views folder is 'views'
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000);