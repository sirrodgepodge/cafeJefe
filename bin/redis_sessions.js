var router = require('express').Router(),
    redis = require('redis'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redisUrl = process.env.NODE_ENV === 'production' ? require('url').parse(process.env.REDIS_URL) : null;

var redisStore = require('connect-redis')(session),
    redisClient = redisUrl ? redis.createClient(redisUrl.port, redisUrl.hostname) : redis.createClient(); //CREATE REDIS CLIENT
    process.env.NODE_ENV === 'production' && redisClient.auth(redisUrl.auth.split(":")[1]); //authenticate redis connection

console.log(process.env.REDIS_URL);

router.use(session({
    secret: 'mysecretcode',
    store: new redisStore({
        host: redisUrl ? redisUrl.hostname : 'localhost', //states the host to listen on
        port: redisUrl ? redisUrl.port : 6379, //listen for redis db on this port
        client: redisClient,
        ttl: 900 //time out after 15 minutes
    }),
    saveUninitialized: true, // don't create session until something stored,
    resave: false, // don't save session if unmodified
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 162000000 //cookie times out after 45 mins, number is in milliseconds
    }
}));

module.exports = router;