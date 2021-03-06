const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin.routes');
const shopRoutes = require('./routes/shop.routes');

const errorController = require('./controllers/error.controller');

const db = require('./util/database.connection');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const Cart = require('./models/cart.model');
const CartItem = require('./models/cart-item.model');
const Order = require('./models/order.model');
const OrderItem = require('./models/order-item.model');

const app = express();

// app.set(name, value) allows us to set any value globally in our express application
app.set('view engine', 'pug');
// this is set automatically if views folder is 'views'
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// define assossiations
// User-Product *one-to-many
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Cart-User **many-to-many (through CartItems table)
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Order-User **many-to-many (through OrderItems table)
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

db
  .sync()
  // .sync({ force: true })
  .then(_ => {
    return User.findById(1);
  })
  .then(user => {
    if (!user) {
      return User.create({name: 'Taras', email: 'taras.tataryn.ttm@gmail.com'});
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(_ => {
    app.listen(3000);
  })
  .catch(err => console.log(err));