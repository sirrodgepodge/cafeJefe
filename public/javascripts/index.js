var main = function() {
    //create static jQuery selector vars
    var $purchase_toggle= $('.purchase_toggle');
    var $labels= $('.labels');
    var $buy_btn= $('.buy_btn');
    var $button_fill= $('.button_fill');

    $purchase_toggle.click(function(){
		if(!$(this).hasClass('active-pill')){
			$purchase_toggle.each(function() {
				$(this).toggleClass('active-pill');
			});
			var purch_type_val = $(this).attr('id');
			$buy_btn.each(function(){
				$(this).attr('value',purch_type_val.slice(0,1).toUpperCase()+purch_type_val.slice(1));
			});
		}
	});

	$labels.click(function(){
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

	$button_fill.click(function(){
		$.ajax({
			url: "/",
			type: "POST",
			data: {
				1: "-bag-subscribe"
			}
		});
	});
};

$(document).ready(main);