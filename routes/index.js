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


/* force redirect HTTP to HTTPS for heroku routes */
// router.get('*', function(req, res, next) {
//     if (req.headers['x-forwarded-proto'] === 'http' || req.get('host') !== 'cafejefe.herokuapp.com' && process.env.NODE_ENV === 'production') res.redirect('https://cafejefe.herokuapp.com' + req.originalUrl);
//     else next();
// });


/* GET home page */
router.get('/', function(req, res, next) {
    res.render('index', localsObj);
});


/* GET server info */
router.get('/api/info', function(req, res, next) {
    res.json(localsObj);
});


module.exports = router;