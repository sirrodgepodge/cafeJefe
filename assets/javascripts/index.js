// Create static jQuery selector vars
var $purchaseToggle = $('.purchase-toggle');
var $coffeeInd = $('.coffee-ind');
var $buyBtn = $('.buy-btn');
var $buttonFill = $('.button-fill');
var $coffeePrice = $('.coffee-price');
var $merchPrice = $('.merch-price');
var $backToTop = $('.back-to-top, .title');
var $title = $('.title');
var $body = $('body');


// Prices array
var prices = {
    purchase: [18, 33, 46, 57],
    subscribe: [15, 28, 39, 48],
    merch: [20, 12, 20, 20]
};


// Addresses array for map markers
var addresses = [
    // '300 W Rosemary Lane, falls church, va 22046',
    '6147 Lakeside Dr #102, Reno, NV 89502'
];


// UI Functionality
var main = function() {
    // Initialize prices
    var purchTypeVal = $('.active-purch-type').attr('id');
    var inc = 0;
    $coffeePrice.each(function() {
        $(this).html('$' + prices[purchTypeVal][inc]);
        inc++;
    });
    inc = 0;
    $merchPrice.each(function() {
        $(this).html('$' + prices.merch[inc]);
        inc++;
    });

    // Toggle between Subscription vs. One-Time Purchase
    $purchaseToggle.click(function() {
        if (!$(this).hasClass('active-purch-type')) {
            $purchaseToggle.each(function() {
                $(this).toggleClass('active-purch-type');
            });
            purchTypeVal = $(this).attr('id');
            $('.button-text').html(purchTypeVal.slice(0, 1).toUpperCase() + purchTypeVal.slice(1));
            inc = 0;
            $coffeePrice.each(function() {
                $(this).html('$' + prices[purchTypeVal][inc]);
                inc++;
            });

            $buyBtn.each(function() {
                var currVal = $(this).attr('href').slice(0, $(this).attr('href').lastIndexOf("-") + 1);
                $(this).attr('href', currVal + purchTypeVal);
            });
        }
    });

    $coffeeInd.click(function() {
        if (!$(this).hasClass('active-coffee-amount')) {
            $('.active-coffee-amount').toggleClass('active-coffee-amount');
            $(this).children('.coffee-ind-inside').toggleClass('active-coffee-amount');
        }
    });

    $buttonFill.hover(function() {
        $(this).children('.button-inside').addClass('full');
    }, function() {
        $(this).children('.button-inside').removeClass('full');
    });

    $backToTop.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, $(window).scrollTop() * 0.65);
    });
};


// Load Google Maps
var mapLoad = function(addresses) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[0] + '&sensor=false', null, function(centerData) {
        var centerCoord = centerData.results[0].geometry.location;
        var map,
            mapOptions = {
                center: new google.maps.LatLng(centerCoord.lat, centerCoord.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    stylers: [{
                        'saturation': -100
                    }, {
                        'lightness': 0
                    }, {
                        'gamma': 0.5
                    }]
                }, ],
                zoom: 15,
                scrollwheel: false,
                draggable: true,
            };

        map = new google.maps.Map($('#map')[0], mapOptions);

        var bounds = new google.maps.LatLngBounds(); //this code autofits & zooms to include all markers, bad if there's only one
        for (var x = 0; x < addresses.length; x++) {
            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function(data) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                bounds.extend(latlng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/Marker_Mask.png'
                });
                if (addresses.length > 1) map.fitBounds(bounds);
            });
        }
    });
};

// Handle fixing title bar at the top of the page
var $placeHolder = document.createElement('div');
$placeHolder.className = 'place-holder';
console.log($placeHolder);
var isAdded = false;
var breakPoint = $title.offset().top;
var first = true;

var stickyTitle = function() {
    $(window).scroll(function() {
        console.log('listen');
        if (window.pageYOffset >= breakPoint && !isAdded) {
            $title.addClass('sticky');
            $body.before($placeHolder);
            if(first) {
                $placeHolder = $('.place-holder');
                first = false;
            }
            isAdded = true;
        } else if (window.pageYOffset < breakPoint && isAdded) {
            $title.removeClass('sticky');
            $placeHolder.detach();
            isAdded = false;
        }
    });
};

$(document).ready(main, mapLoad(addresses), stickyTitle());