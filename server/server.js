var express = require('express');
var http = require("http");

var logger = require('morgan'); 

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var cors = require('cors')

var config = require('./config/config'); 

var _routes = require('./routes');

require('./cache/fscache');

var app = express();

//app.use(cors())

const server = http.createServer(app);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(logger('combined'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Caching should be prevented with this?
//app.set('etag', false);

app.use('/', _routes);

// when going to `/`, serve the files at client/build/* as static files
app.use( express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res, next){
  res.sendFile(path.join(__dirname,'../client/build/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:err});  
});



var port = config.server.port || 3030;        // set our port

// START THE SERVER
// =============================================================================
server.listen(port);
console.log(`Stuff is going down on port ${port}`);



