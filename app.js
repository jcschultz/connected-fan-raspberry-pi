var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');
var creds = require('./creds/creds');
var fanControls = require('./modules/fan-controls');
var fanRouting = require('./routes/fanRouting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

// validating token against auth0 service
var jwtCheck = jwt({
	secret: rsaValidation(),
	audience: creds.auth0.audience,
	issuer: creds.auth0.issuer,
	algorithms: ['RS256']
});
//app.use(jwtCheck);


// set up gpio pins
fanControls.initPins();


app.use('/', fanRouting);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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
