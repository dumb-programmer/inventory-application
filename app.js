require("dotenv").config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");

(async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to MongoDB");
  }
  catch (error) {
    console.error("Can't connect to MongoDB");
  }
})();

const indexRouter = require('./routes/index');
const itemRouter = require("./routes/item");
const categoryRouter = require("./routes/category");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/upload", express.static(path.join(__dirname, "upload")))
app.use(compression());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  "directives": {
    "img-src": ["'self'", "https://placehold.co/"],
  }
}));
// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);



app.use('/', indexRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
