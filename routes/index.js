var express = require('express');
var router = express.Router();
var localsObj = require('../models/site_info');
//var User = require('../models/user');


/* force redirect HTTP to HTTPS for heroku routes, no longer necessary because of CloudFlare */
// router.get('*', function(req, res, next) {
//  // if (req.headers['x-forwarded-proto'] !== 'https') res.redirect('https://' + req.get('host') + req.originalUrl);
//     if (req.headers['x-forwarded-proto'] !== 'https') res.redirect('https://' + req.get('host') + req.originalUrl);
//     else next();
// });


/* GET home page */
router.get('/', function(req, res, next) {
    localsObj.user = !req.session ? null : req.session.userId ? req.session.userId : null;
    console.log(req.session);
    res.render('index', localsObj);
});


/* GET server info */
router.get('/api/info', function(req, res, next) {
    res.json(localsObj);
});


router.post('/signup', function(req, res, next) {  //change all "queries" to "body" later
    User.findByEmail(req.query.email).exec().then(function(user) {
        if (user) {
            var err = new Error(process.enc.NODE_ENV === 'production' ? 'unauthorized' : 'username does not exist');
            next(err);
            res.end('username already exists');
        } else {
            User.create({
                email: req.query.email,
                password: req.query.password
            }, function(err, newUser){
                if(err) next(err);
                req.session.userId = newUser._id;
                res.json(newUser);
            });
        }
    }).then(null, next);
});


router.post('/login', function(req, res, next) {
    User.findByEmail(req.query.email).exec().then(function(user) {
        if (user) {
            user.authenticate(req.query.password, function(err, user) {
                if (err) {
                    next(err);
                    res.end('wrong password');
                } else {
                    req.session.userId = user._id;
                    res.json(user);
                }
            });
        } else {
            var err = new Error(process.enc.NODE_ENV === 'production' ? 'unauthorized' : 'username does not exist');
            next(err);
            res.end('username does not exist');
        }
    }).then(null, next);
});


router.get('/logout', function(req, res, next) {
    req.session.userId = null;
    res.status(200).end();
});


module.exports = router;
