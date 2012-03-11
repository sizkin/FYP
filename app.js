var express = require('express'),
	app = module.exports = express.createServer();
var http = require('http');

// custom module
//

// global var
var port = process.env.C9_PORT || 3000;

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

app.get('/', function(req, res) {
	res.render('index', {
		title: 'WAF System'
	});
});

// Set the params for request
app.param('urlT');
app.param('host');

app.get('/:urlT', function(req, res) {
	var urlT = req.params.urlT;
	res.render(urlT, {
		title: 'WAF System - ' + urlT
	});
});

// Get the informations of Server
var options = {
    host: 'www.apache.org',
    port: 80,
    path: '/'
};
http.get(options, function(req) {
    var serverName = req.header('Server');
    console.log(serverName);
});

app.listen(port);
console.log('Server is running');
