var configs = require('../config').configs,
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    os = require('os');
var serInfo = [],
    adminUser,
    __rootPath = configs.rootPath;

    //serInfo = [];
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
                title: 'Login',
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
                //console.log('success');
                req.session.currentUser = username;
                /*
                res.json({
                    currentUser: username
                });*/
                res.render('msghandle', {
                    title: 'Message',
                    type: 'nort',
                    err: 'logined'
                });
            } else {
                res.render('msghandle', {
                    title: 'Message',
                    type: 'error',
                    err: 'loginFailed'
                });
                console.log('wrong login');
            }
        } else {
            res.render('msghandle', {
                title: 'Message',
                type: 'error',
                err: 'relogin'
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
            res.render('msghandle', {
                title: 'Message',
                type: 'error',
                err: 'nologin'
            });
        } else {
            res.render('home', {
                title: 'Home',
                serInfo: serInfo
            });
        }
    });
    
    /**
     * Map the uRL '/stat' [GET]
     */
    app.get('/stat', function(req, res) {
        if(typeof req.session.currentUser == 'undefined') {
            res.render('msghandle', {
                title: 'Message',
                type: 'error',
                err: 'nologin'
            });
        } else {
            res.render('stat', {
                title: 'Stat'
            });
        }
    });

    /**
     * Func
     */
    // Get the informations of Server
    function getSerInfo(serInfo) {
        
            serInfo.server = os.hostname();
            serInfo.os = os.type();
            serInfo.osplatform = os.platform();
        
    
        return serInfo;
    }

    getSerInfo(serInfo);
    //console.log(serInfo);
};
