
/**
 * Module dependencies.
 */

var express = require('express');
var docs    = require('./lib/docs');
var path    = require('path');
var app     = module.exports = express();

app.locals.package = require('../../package.json');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(docs);
app.use(app.router);
app.use(express.compress());
app.use(express.static(path.join(__dirname, '../../public')));

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index.twig');
});
