/*
|--------------------------------------------------------------------------
| Define server
|--------------------------------------------------------------------------
|
| Here is where you define the server variables and hook everything up.
| It's a breeze. Just require what the nodejs server needs, express and 
| socket.io
|
*/

var appPort  = 4568;

var express  = require('express');
var app      = express();
var port     = process.env.PORT || appPort;
var path     = require('path');
var mongoose = require('mongoose');
var passport = require('passport'); 
var exphbs   = require('express-handlebars');

var bodyParser     = require('body-parser');
var session        = require('cookie-session');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var methodOverride = require('method-override');

var passport = require('passport');
var flash    = require('connect-flash');

var seeder   = require('./app/seeder');
var routes   = require('./app/routes');

var configDB = require('./config/database.js');     


/*
|--------------------------------------------------------------------------
| Configure express
|--------------------------------------------------------------------------
|
|
*/


var env = process.env.NODE_ENV || 'development';

if ('development' == env) {

    // set up view engine {{handlebars}} 
    app.set('views', __dirname + '/views');
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts'
    }));
    app.set('view engine', 'handlebars');

    // set up our express application
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cookieParser()); // required before session.
    app.use(session({ secret: 'keyboard cat' }));
    app.use(methodOverride());

    // required for passport
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

}

if ('production' == env) {

    // set up view engine {{handlebars}} 
    app.set('views', __dirname + '/views');
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts'
    }));
    app.set('view engine', 'handlebars');

    // set up our express application
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cookieParser()); // required before session.
    app.use(session({ secret: 'keyboard cat' }));
    app.use(methodOverride());

    // required for passport
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

}



/*
|--------------------------------------------------------------------------
| Connect to the database
|--------------------------------------------------------------------------
|
|
*/


// Connect to the db server:
//mongoose.set('debug', true);
mongoose.connect(configDB.url); 
require('./config/passport')(passport); // pass passport for configuration

// Do something when connected
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");
    seeder.check();
    seeder.testWeek();
});



/*
|--------------------------------------------------------------------------
| Launch the application
|--------------------------------------------------------------------------
|
|
*/

app.listen(appPort);
console.log('The magic happens on port ' + port);


/*
|--------------------------------------------------------------------------
| Pass our app to the application routes and the socket
|--------------------------------------------------------------------------
|
|
*/

var router = express.Router();
routes.initialize(app,router, passport);
