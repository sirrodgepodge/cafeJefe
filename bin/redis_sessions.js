var router = require('express').Router(),
    redis = require('redis'),
    session = require('express-session'),
    redisUrl = require('url').parse(process.env.REDIS_URL);

var redisStore = require('connect-redis')(session),
    redisClient = redis.createClient(redisURL.port, redisURL.hostname); //CREATE REDIS CLIENT
    redisClient.auth(redisURL.auth.split(":")[1]); //authenticate redis connection

console.log(process.env.REDIS_URL);

router.use(session({
    secret: 'mysecretcode',
    store: new redisStore({
        host: process.env.NODE_ENV === 'production' ? redisURL.hostname : 'localhost', //states the host to listen on
        port: process.env.NODE_ENV === 'production' ? redisURL.port : 6379, //listen for redis db on this port
        client: redisClient,
        ttl: 900 //time out after 15 minutes
    }),
    saveUninitialized: false, // don't create session until something stored,
    resave: false, // don't save session if unmodified
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 162000000 //cookie times out after 45 mins, number is in milliseconds
    }
}));

module.exports = router;

var express = require('express').Router(),
    redis = require('redis'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redisUrl = require('url').parse(process.env.REDIS_URL);

var redisURL = url.parse(process.env.REDIS_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname);
client.auth(redisURL.auth.split(":")[1]);

var redisStore = require('connect-redis')(session),
    redisClient = redis.createClient(), //CREATE REDIS CLIENT
    app = express();

router.use(cookieParser('mysecretcode'));
router.use(session({
    secret: 'myothersecretcode',
    store: new redisStore({
        host: process.env.NODE_ENV === 'production' ? redisURL.hostname : 'localhost', //states the host to listen on
        port: process.env.NODE_ENV === 'production' ? redisURL.port : 6379, //listen for redis db on this porst
        client: redisClient,
        ttl: 900 //time out after 15 minutes
    }),
    saveUninitialized: true, // don't create session until something stored,
    resave: false // don't save session if unmodified
}));

var router = express.Router();

module.exports = router;