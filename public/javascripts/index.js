//create static jQuery selector vars
var $purchase_toggle= $('.purchase_toggle');
var $label= $('.label_');
var $buy_btn= $('.buy_btn');
var $button_fill= $('.button_fill');
var $price= $('.price');

//prices array
var prices={
	purchase:[16,30,42,51.96],
	subscribe:[15,28,38.97,48]
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
			$('button-text').html(purchTypeVal.slice(0,1).toUpperCase()+purchTypeVal.slice(1));
			//$('inside').html(purchTypeVal.slice(0,1).toUpperCase()+purchTypeVal.slice(1));
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
};

$(document).ready(main);
