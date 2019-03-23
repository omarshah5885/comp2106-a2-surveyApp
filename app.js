var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// var flash = require('connect-flash');
// var session = require('express-session');
// var passport = require('passport');

// connect to mongoose db
mongoose.connect(
  'mongodb+srv://user:Abc123!@cluster0-rltl0.mongodb.net/test?retryWrites=true ',
  {
    useNewUrlParser: true
  }
);

// grab mongoose connection to listen to error/open events
var db = mongoose.connection;

// console log the error when db emits an error
db.on('error', console.error.bind(console, 'Connection Error'));

// console log connected once when db emits open
db.once('open', callback => console.log('Connected to mongodb'));


// route files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
