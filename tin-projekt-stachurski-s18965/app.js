var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const playerRouter = require('./routes/playerRoute');
const coachRouter = require('./routes/coachRoute');
const matchRouter = require('./routes/matchRoute');
const playerApiRouter = require('./routes/api/PlayerApiRoute');
const coachApiRouter = require('./routes/api/CoachApiRoute');
const matchApiRouter = require('./routes/api/MatchApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/players', playerRouter);
app.use('/coaches', coachRouter);
app.use('/matches', matchRouter);
app.use('/api/players', playerApiRouter);
app.use('/api/coaches', coachApiRouter);
app.use('/api/matches', matchApiRouter);

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
