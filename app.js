let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');

let config = require('./config');

let secret = config.secret;

let homepageRouter = require('./routes/homepage');
let loginRouter = require('./routes/login');
let postariRouter = require('./routes/postari');
let utilizatoriRouter = require('./routes/utilizatori');
let apiRouter = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ name: "sid", resave: false, saveUninitialized: false, secret: secret, cookie: { maxAge: 1000 * 60 * 60 * 2, sameSite: true, secure: false } }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homepageRouter);
app.use('/login', loginRouter);
app.use('/postari', postariRouter);
app.use('/utilizatori', utilizatoriRouter);
app.use('/api', apiRouter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



module.exports = app;
