/**==========================================
 *  Module dependencies
   ========================================== */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

/**==========================================
 *  DB Connect
   ========================================== */
   
mongoose.connect(configDB.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MongoDb at " + configDB.url);
});

require('./config/passport')(passport); // pass passport for configuration

/**==========================================
 *  Express Configuration
   ========================================== */

// sets port to the process environment port, or 8888
app.set('port', process.env.PORT || 8888);

// set the view directory path
app.set('views', __dirname + '/views');

// set the template engine to ejs
app.set('view engine', 'ejs');

// use the express logger middleware for logging
app.use(express.logger('dev'));

// set the favicon
app.use(express.favicon("public/img/oracle-favicon.ico")); 

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// use the directory serving middleware, for serving files in the public directory
app.use('/public', express.static(path.join(__dirname, '/public')));

/**==========================================
 *  Routes
   ========================================== */
   
require('./routes/routes.js')(app, passport);



 /**==========================================
  *  Start the Server
   ========================================== */
 
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

