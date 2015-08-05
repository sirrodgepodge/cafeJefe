var express = require('express');
var router = express.Router();

var localsObj = {
    coffee: [{
        name: '1 bag',
        purchase: 18,
        subscribe: 15
    }, {
        name: '2 bags',
        purchase: 33,
        subscribe: 28
    }, {
        name: '3 bags',
        purchase: 46,
        subscribe: 39
    }, {
        name: '4 bags',
        purchase: 57,
        subscribe: 48
    }],
    merch: [{
        name: 'tshirt',
        price: 20,
        sizes: ['S', 'M', 'L', 'XL']
    }, {
        name: 'mug',
        price: 12,
        sizes: []
    }, {
        name: 'tank',
        price: 20,
        sizes: ['S', 'M', 'L', 'XL']
    }, {
        name: 'girlt',
        price: 20,
        sizes: ['S', 'M', 'L', 'XL']
    }],
    contact: {
        instagram: {
            text: 'instagram.com/CafeJefeLLC',
            link: 'http://www.instagram.com/cafejefellc'
        },
        address: {
            text: '6147 Lakeside Dr #102, Reno, NV 89502',
            link: 'https://www.google.com/maps/place/Pedalers+Deli/@39.471266,-119.8087336,17z/data=!3m1!4b1!4m2!3m1!1s0x80994014c55a99eb:0xcf7d2a91ee0370be'
        },
        facebook: {
            text: 'facebook.com/CafeJefeLLC',
            link: 'http://www.facebook.com/cafejefellc'
        },
        phone: {
            text: '(775) 499-5134',
            link: 'tel:+17754995134'
        },
        email: {
            text: 'julian@CafeJefe.com',
            link: 'mailto:julian@cafejefe.com'
        }
    }
};

/* force redirect HTTP to HTTPS for heroku routes, no longer necessary because of CloudFlare */
// router.get('*', function(req, res, next) {
// 	// if (req.headers['x-forwarded-proto'] !== 'https') res.redirect('https://' + req.get('host') + req.originalUrl);
//     if (req.headers['x-forwarded-proto'] !== 'https') res.redirect('https://' + req.get('host') + req.originalUrl);
//     else next();
// });


/* GET home page */
router.get('/', function(req, res, next) {
    localsObj.user = req.session.userId ? req.session.userId: null;
    res.render('index', localsObj);
});


/* GET server info */
router.get('/api/info', function(req, res, next) {
    res.json(localsObj);
});

router.get('/login', function(req, res, next){
    User.findByEmail(req.query.email).exec().then(function(user){
	if(user && user.authenticate(req.query.password)) {
	    req.session.userId = user._id;
	    res.json(user);
	} else {
	    var err = new Error('unauthorized');
	}.then(null, next);
    })
});

router.get('/logout', function(req, res, next){
    req.session.userId = null;
    res.status(200).end();
});


module.exports = router;
