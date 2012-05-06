var configs = require('../config').configs,
    http = require('http');
var serInfo,
    adminUser;

    serInfo = [];
    adminUser = {
        'username': configs.root,
        'password': configs.password
    };

/**
 * GET Pages
 */
module.exports = function(app) {
    // Set the params for request
    app.param('urlT');
    
    /**
     * Map the URL '/'
     */
    app.get('/', function(req, res) {
        if(typeof req.session.currentUser == 'undefined') {
            res.render('index', {
                title: 'WAF System',
                user: adminUser
    	    });   
        } else {
            res.redirect('/home');
        }
    });

    /**
     * Map the URL '/login' [GET]
     */
    app.get('/login', function(req, res) {
        if(typeof req.session.currentUser == 'undefined') {
            res.redirect('/');
        } else {
            res.redirect('/home');
        }
    });

    /**
     * Map the URL '/login' [POST]
     */
    app.post('/login', function(req, res) {
        console.log('Server request for url [POST] ' + req.route.path);
        var username = req.body.username,
            password = req.body.password;

        if(typeof req.session.currentUser == 'undefined') {
            if(username == adminUser.username && password == adminUser.password) {
                console.log('success');
                req.session.currentUser = username;
                res.json({
                    currentUser: username
                });
            } else {
                console.log('wrong login');
            }
        } else {
            res.render('errorhandle', {
                err: 'logined'
            });
        }

    });

    /**
     * Map the URL '/logout' [GET]
     */
    app.get('/logout', function(req, res) {
        console.log('Logged out');
        req.session.currentUser = undefined;
        res.redirect('/');
    });

    /**
     * Map the URL '/home' [GET]
     */
    app.get('/home', function(req, res) {
        if(typeof req.session.currentUser == 'undefined') {
            res.render('errorhandle', {
                title: 'Error Message',
                err: 'nologin'
            });
        } else {
            res.render('home');
        }
    });

    /**
     * Map the URL '/<which are the hosted websites>'
     */
    app.get('/:urlT', function(req, res) {
	    var urlT = req.params.urlT;
    	res.render(urlT, {
            title: 'WAF System - ' + urlT,
            url: urlT,
            serInfo: serInfo
	    });
    });

    /**
     * Func
     */
    // Get the informations of Server
    function getSerInfo(serInfo) {
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

    getSerInfo(serInfo);
    //console.log(serInfo);
};
