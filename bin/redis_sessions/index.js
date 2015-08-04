var express = require('express').Router(),
    redis = require('redis'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var redisStore = require('connect-redis')(session),
    redisClient = redis.createClient(), //CREATE REDIS CLIENT
    app = express();

router.use(cookieParser('mysecretcode'));
router.use(session({
    secret: 'myothersecretcode',
    store: new redisStore({
        host: process.env.NODE_ENV==='production'?'www.cafejefe.com':'localhost', //states the host to listen on
        port: 6379, //listen for redis db on this porst
        client: redisClient,
        ttl: 900 //time out after 15 minutes
    }),
    saveUninitialized: true, // don't create session until something stored,
    resave: false // don't save session if unmodified
}));

var router = express.Router();

module.exports = router;