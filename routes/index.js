var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'CafeJefe', 
		mainLogo: './images/cafeJefe.jpg'
		    });
});

module.exports = router;
