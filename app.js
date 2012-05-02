var express = require('express'),
	app = module.exports = express.createServer();
var http = require('http');

// custom module
var configs = require('./config').configs;

// global var
var port = configs.port,
    adminUser = {},
    serInfo = [];

    adminUser = {
        'username': configs.root,
        'password': configs.password
    };

// mongodb connection
//var Db = require('mongodb').Db,
//	Connection = require('mongodb').Connection,
//  Server = require('mongodb').Server,
//	BSON = require('mongodb').BSON,
//	ObjectID = require('mongodb').ObjectID;

//var db = new Db('fyp', new Server('localhost', 27017, {}, {}));
// End mongodb connection

app.configure(function() {
	try {
		app.use(express.methodOverride());
		app.use(express.bodyParser());
		app.set('view engine', 'jade');
		app.set('views', __dirname + '/views');
		app.use(express.static(__dirname + '/public'));
		app.use(app.router);
	} catch(e) {
		console.log(e);
	}
});

getSerInfo(serInfo);
console.log(serInfo);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'WAF System',
        user: adminUser
	});   
});

// Set the params for request
app.param('urlT');

app.get('/:urlT', function(req, res) {
	var urlT = req.params.urlT;
	res.render(urlT, {
        title: 'WAF System - ' + urlT,
        url: urlT,
        serInfo: serInfo
	});
});

function getSerInfo(serInfo) {
    // Get the informations of Server
    var options = {
        host: 'www.apache.org',
        port: 80,
        path: '/'
    };
    // response
    http.get(options, function(res) {
        serInfo.server = res.header('Server');
    });
    
    return serInfo;
}

app.listen(port);
console.log('Server is running');
