//create static jQuery selector vars
var $purchase_toggle= $('.purchase_toggle');
var $label= $('.label_');
var $buy_btn= $('.buy_btn');
var $button_fill= $('.button_fill');
var $price= $('.price');

//prices array
var prices={
	purchase:[16,30,42,52],
	subscribe:[15,28,39,48]
};

var main = function() {
    var purchTypeVal= $('.active-pill').attr('id');
    var inc= 0;
    $price.each(function(){
	$(this).html('$'+prices[purchTypeVal][inc]);
	inc++;
    });
    
    $purchase_toggle.click(function(){
		if(!$(this).hasClass('active-pill')){
			$purchase_toggle.each(function() {
				$(this).toggleClass('active-pill');
			});
			purchTypeVal = $(this).attr('id');
			$('.button-text').html(purchTypeVal.slice(0,1).toUpperCase()+purchTypeVal.slice(1));
			inc = 0;
			$price.each(function(){
				$(this).html('$'+prices[purchTypeVal][inc]);
				inc++;
			});

			$buy_btn.each(function(){
			var currVal = $(this).attr('href').slice(0, $(this).attr('href').lastIndexOf("-")+1);
			$(this).attr('href', currVal + purchTypeVal);
		});
		}
	});
    
    $label.click(function(){
	if(!$(this).hasClass('active-text')){
		$('.active-text').toggleClass('active-text');
		$(this).toggleClass('active-text');
	}
    });
    
    $button_fill.hover(function () {
	$(this).children(".button-inside").addClass('full');
    }, function() {
	$(this).children(".button-inside").removeClass('full');
    });
    
    var addresses = ["6147 Lakeside Drive, Reno, NV 89502","300 W Rosemary Lane, falls church, va 22046"];
    
    var toLatLng = function(addressArr, cb) {
		addressArr= typeof addressArr==='object'&&addressArr||[addressArr];
		var results = [];
		for(var i = 0; i<addressArr.length; i++){
			$.getJSON('http://maps.googleapis.com/api/geocode/json?address='+addressArr[i]+'&sensor=false&key=AIzaSyCy6aNLouwxXosCK0PdQ5P2vm578iUqlM4', null, function(data) {
				var addrObj = data.results[0].geometry.location;
				results.push([addrObj.lat, addrObj.lng]);
			});
		}
		while(true){
			if(results.length===addressArr.length) return cb(null, results);
		}
    };

    console.log(addresses);

    toLatLng(addresses, function(err, data){
		console.log(data);
		var map = $("#map").gmap3({
            marker: {
                address: "300 W Rosemary Lane, falls church, va 22046",
                options:{
                    icon: "images/Marker_Mask.png"
                }
            },
            map:{
                options:{
                    styles: [{
                        stylers: [{ "saturation":-100 }, { "lightness": 0 }, { "gamma": 0.5 }]
                    },],
                    zoom: 15,
                    scrollwheel:false,
                    draggable: true,
                    center: new google.maps.LatLng(data[0][0],data[0][1])
                }
            }
        });
	console.dir(map);
    });
};

$(document).ready(main);
