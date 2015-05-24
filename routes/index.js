var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'CafeJefe'
		    });
});

router.post('/', function(req, res, next){
	var url= "https://cafejefe-test.chargebee.com/hosted_pages/plans/";
	for (prop in req.body){
	    url+=prop;
	    url+=req.body[prop].toLowerCase();
	    console.log(url);
	}
	res.redirect(301, url);
});

module.exports = router;
