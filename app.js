Bvar express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');

// get routes from 'routes' folder
var routes = require('./routes/index');

// create express app object (which is a function actually!)
var app = express();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname,'assets', 'views'));

// loading middlewares
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sass({
        src: path.join(__dirname, 'assets', 'styling'), //where the sass files at
        dest: path.join(__dirname, 'public', 'stylesheets'), //where they will be converted to css
        debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
