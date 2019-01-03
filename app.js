const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');

const errorController = require('./controllers/error.controller');

const db = require('./util/database.connection');

const app = express();

// app.set(name, value) allows us to set any value globally in our express application
app.set('view engine', 'pug');
// this is set automatically if views folder is 'views'
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

db.execute('SELECT * FROM product;')
  .then(result => {
    const resultSet = result[0];
    for (let r of resultSet) {
      console.log(r.title);
    }
  })
  .catch(err => {
    console.log(err);
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);