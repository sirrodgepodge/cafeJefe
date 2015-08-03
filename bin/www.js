#!/usr/bin/env node;

// New Relic
require('newrelic');

// Module dependencies
require('express');
var app = require('../app');
var debug = require('debug')('cafeJefe:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '443');
app.set('port', port);

console.log(process.env.NODE_ENV);

// Run HTTPS server if not in Heroku
if (process.env.NODE_ENV !== 'production') {
    // Load self-signed certificate
    var httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, 'auth/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'auth/cert.pem'))
    };
    var server = https.createServer(httpsOptions, app);
    
    // Create HTTP server for redirecting to HTTPS
    http.createServer(function(req, res) {
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
    }).listen(80);
} else {
    var server = http.createServer(app);
}


// Listen on provided port, on all network interfaces.
server.listen(port, function() {
    console.log('HTTPS server patiently listening on port', port);
});
server.on('error', onError);
server.on('listening', onListening);


// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') throw error;

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


// Event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}