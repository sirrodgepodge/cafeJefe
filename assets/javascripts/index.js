// Create static jQuery selector vars
var $purchaseToggle = $('.purchase-toggle');
var $coffeeInd = $('.coffee-ind');
var $buyBtn = $('.buy-btn');
var $buttonFill = $('.button-fill');
var $coffeePrice = $('.coffee-price');
var $merchPrice = $('.merch-price');
var $backToTop = $('.back-to-top, .title');
var $title = $('.title');
var $placeHolder = $('.place-holder');


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
        addresses.forEach(function(val, index) {
            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + val + '&sensor=false', null, function(data) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                bounds.extend(latlng);
                
                //Add marker
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/Marker_Mask.png'
                });

                //Create pop-up window object
                var infowindow = new google.maps.InfoWindow({
                    content: '<p class="marker-caption">' + val + '</p>'
                });
                
                //Add listeners to marker to open and close info window on click
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                google.maps.event.addListener(infowindow, 'closeclick', function() {
                    map.setCenter(marker.getPosition());
                });

                if(index>1) map.fitBounds(bounds);
            });
        });
    });
};

// Handle fixing title bar at the top of the page
var stickyTitle = function() {
    var breakPoint = Math.ceil($title.offset().top);
    var pagePos = 0;
    var isAdded = false;
    window.addEventListener('scroll',function() {
        pagePos = window.pageYOffset;
        if (pagePos - breakPoint >= 0 && !isAdded || pagePos - breakPoint < 0 && isAdded) {
            $title.toggleClass('sticky');
            $placeHolder.toggleClass('no-show');
            isAdded = !isAdded;
        }
    });
};

$(document).ready(main, mapLoad(addresses), stickyTitle());