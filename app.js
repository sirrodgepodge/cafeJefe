var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var compression = require('compression');

// create express app object (which is a function actually!)
var app = express();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname,'assets', 'views'));

// loading middlewares
app.use(sass({
  src: path.join(__dirname, 'assets'), //where the sass files at
  dest: path.join(__dirname, 'public'), //where they will be converted to css
  outputStyle: 'compressed',
  debug: true
}));
app.use(compression());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.use(require('./bin/redis_sessions')); //handles storing sessions in redis
//app.use(passport.initialize());
//app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));

// routes
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set app environment to NODE_ENV
app.set('env', process.env.NODE_ENV || 'development');

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
