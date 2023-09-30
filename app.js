const express = require("express");
const app = express();

const path = require("path");
const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionCongif = require("./config/session");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrfToken");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddlewares = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/notFound');

const authRoute = require("./routes/auth.route");
const openRoute = require("./routes/open.route");
const productRoute = require('./routes/products.route');
const adminRoute = require("./routes/admin.route");
const cartRoute = require('./routes/cart.route');
const orderRoute = require('./routes/order.route');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession(createSessionCongif()));
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(openRoute);
app.use(authRoute);
app.use(productRoute);
app.use('/cart', cartRoute);
app.use('/orders',protectRoutesMiddlewares, orderRoute);
app.use('/admin',protectRoutesMiddlewares, adminRoute);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    // console.log('Connected to database and listen the server sucessfully!');
    app.listen(3000);
  })
  .catch(function () {
    console.log(error);
    console.log("Could not connect to database and listen the server!");
  });
