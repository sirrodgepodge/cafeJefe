var router = require('express').Router(),
    redis = require('redis'),
    session = require('express-session');

var redisStore = require('connect-redis')(session),
    redisClient = redis.createClient(); //CREATE REDIS CLIENT

console.log(process.env.REDIS_URL);
console.log(process.env.REDISTOGO_URL);

router.use(session({
    secret: 'mysecretcode',
    store: new redisStore({
        host: process.env.NODE_ENV==='production'?'www.cafejefe.com':'localhost', //states the host to listen on
        port: 6379, //listen for redis db on this port
        client: redisClient,
        ttl: 900 //time out after 15 minutes
    }),
    saveUninitialized: false, // don't create session until something stored,
    resave: false, // don't save session if unmodified
    cookie: {secure: process.env.NODE_ENV==='production'? true: false,
	     maxAge: 162000000 //cookie times out after 45 mins, number is in milliseconds
	    }
}));

module.exports = router;
