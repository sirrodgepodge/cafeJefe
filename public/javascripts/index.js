//create static jQuery selector vars
var $purchase_toggle= $('.purchase_toggle');
var $label= $('.label_');
var $buy_btn= $('.buy_btn');
var $buttonFill= $('.button_fill');
var $price= $('.price');
var $backToTop= $('.back-to-top');

//prices array
var prices={
	purchase: [16,30,42,52],
	subscribe: [15,28,39,48]
};

//addresses array for map markers
var addresses = [
		// '300 W Rosemary Lane, falls church, va 22046',
        '6147 Lakeside Drive, Reno, NV 89502'
];


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
    
    $buttonFill.hover(function () {
	$(this).children(".button-inside").addClass('full');
    }, function() {
	$(this).children(".button-inside").removeClass('full');
    });

    $backToTop.click(function(){
	$('body').animate({scrollTop:0}, $(window).scrollTop()/2);
    });
};

var mapLoad = function (addresses) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[0] + '&sensor=false', null, function (centerData) {
		var centerCoord = centerData.results[0].geometry.location;
		var map,
			mapOptions = {
			center: new google.maps.LatLng(centerCoord.lat, centerCoord.lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{
				stylers: [{ "saturation":-100 }, { "lightness": 0 }, { "gamma": 0.5 }]
			},],
			zoom: 15,
			scrollwheel:false,
			draggable: true,
		};

		map = new google.maps.Map($('#map')[0], mapOptions);

		// var bounds = new google.maps.LatLngBounds(); //this code autofits & zooms to include all markers, bad if there's only one
		for (var x = 0; x < addresses.length; x++) {
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function (data) {
				var p = data.results[0].geometry.location;
				var latlng = new google.maps.LatLng(p.lat, p.lng);
				// bounds.extend(latlng);
				new google.maps.Marker({
					position: latlng,
					map: map,
					icon: "images/Marker_Mask.png"
				});
				// map.fitBounds(bounds);
			});
		}
	});
};

$(document).ready(main, mapLoad(addresses));
