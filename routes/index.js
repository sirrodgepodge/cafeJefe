var express = require('express');
var router = express.Router();

var infoObj = {
	coffee: [
		{name: '1 bag', purchase: 18, subscribe: 15},
		{name: '2 bags', purchase: 33, subscribe: 28},
		{name: '3 bags', purchase: 46, subscribe: 39},
		{name: '4 bags', purchase: 57, subscribe: 48}
		],
	merch: [
		{name: 'tshirt', price: 20},
		{name: 'mug', price: 12},
		{name: 'tank', price: 20},
		{name: 'girlt', price: 20}
		]
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', infoObj);
});

router.get('/api/info', function(){
	res.json(infoObj);
});

module.exports = router;
