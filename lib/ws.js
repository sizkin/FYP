var configs = require('../config').configs;
var fs = require('fs'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var io = require('socket.io').listen(8033);

var console_red = '\u001b[31m',
    __rootPath = configs.rootPath;
    
module.exports = function(app) {
    io.sockets.on('connection', function(socket) {
        socket.broadcast.emit('connected');
    });

    // socket channels
    var stat;

    stat = io.of('/stat').on('connection', function(socket) {

        socket.on('watch', function(err) {
                var result = [];
                var tmpData = {};
                var dir = __rootPath + '/public/~test';
                fs.readdir(dir, function(err, files) {
                    files.forEach(function(file) {
                        fs.stat(dir + '/' + file, function(err, stat) {
                            var size, atime, ctime, mtime, isDir;
                            size = stat.size;
                            atime = stat.atime;
                            ctime = stat.ctime;
                            mtime = stat.mtime;
                            isDir = stat.isDirectory();
                            /**
                             * replace the " and \ to space
                             */
                            var re = /\"/g;
                            var re2 = /\\/g;
                            var name = JSON.stringify(file);
                            name = name.replace(re, '').replace(re2, '');

                            /**
                             * Check is there any duplicate
                             */
                            tmpData = {
                                name: name,
                                size: size,
                                atime: atime,
                                ctime: ctime,
                                mtime: mtime,
                                isDir: isDir,
                                cdir: dir
                            };

                            function isContains(val) {
                                val = val.toString();
                                for (i in result) {
                                    return (result[i].name == val);
                                }
                            };

                            if (!isContains(tmpData.name)) {
                                result.splice(0,result.length, tmpData);
                                //socket.emit('watched', result);
                            }
                            console.log(result);
                            socket.emit('watched', result);
                        });
                    });
                });
        });// end socket on watch
    });//end socket on connection
};