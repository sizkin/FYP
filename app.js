/**
 * Module dependencies.
 */
var express = require('express'),
    app = module.exports = express.createServer();

// custom module
var configs = require('./config').configs;

// global var
var host = configs.host,
    port = configs.port;

/**
 * Application Configuration
 */
app.configure(function() {
    try {
        app.use(express.methodOverride());
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({
            secret: 'fypgroup10'
        }));
        app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
        app.use(express.static(__dirname + '/public'));
        app.use(app.router);
    } catch(e) {
        console.log(e);
    }
});

app.dynamicHelpers({
    session: function(req, res) {
        return req.session;
    }
});

// Page Routes
require('./lib/routes')(app);

// socket events
require('./lib/ws')(app);

app.listen(port, host);
console.log('Server is running');

module.exports = app;
