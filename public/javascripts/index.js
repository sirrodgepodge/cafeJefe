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

	$("#map").gmap3({
		marker: {
		address:"255 n sierra st, reno, NV 89501",
		options:{ icon: "img/marker.png"}},
		map:{
			options:{
				styles: [{
					stylers: [ { "saturation":-100 }, { "lightness": 0 }, { "gamma": 0.5 }]
				},],
				zoom: 15,
				scrollwheel:false,
				draggable: true
			}
		}
	});
};

$(document).ready(main);
