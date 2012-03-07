var express = require('express'),
	app = module.exports = express.createServer();

// custom module
//

// mongodb connection
var Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server,
	BSON = require('mongodb').BSON,
	ObjectID = require('mongodb').ObjectID;

var db = new Db('fyp', new Server('localhost', 27017, {}, {}));
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

app.get('/:urlT', function() {
	var urlT = req.params.urlT;
	res.render(urlT, {
		title: 'WAF System - ' + urlT
	});
});

app.listen(3000);
console.log('Server is running');
