var main = function() {
    var $purchase_toggle= $('.purchase_toggle');
    $purchase_toggle.click(function(){
	    if(!$(this).hasClass('selected')){
		$purchase_toggle.each(function() {
			$(this).toggleClass('selected');
		    })
		    var purch_type_val = $(this).attr('id');
		$('#purch_type').attr('value',purch_type_val);
	    }
	});
};

$(document).ready(main);