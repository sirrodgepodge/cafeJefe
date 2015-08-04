var express = require('express').Router(),
    logger = require('morgan'),
    redis = require('redis'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var redisStore = require('connect-redis')(session),
    redisClient = redis.createClient(), //CREATE REDIS CLIENT
    app = express();

app.use(cookieParser('mysecretcode'));
app.use(session({
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

app.use(logger("tiny"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully as:', req.params.value);
});

app.get('/session/get/', function(req, res) {
    if (req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSession);
    else
        res.send("no session value stored in Redis ");
});

app.use('/', router);
var server = app.listen(8097, function() {
    console.log('REDIS SESSION server is listening on port %d', server.address().port);
});

module.exports