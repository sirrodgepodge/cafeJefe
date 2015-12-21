// Create static jQuery selector vars
var $purchaseToggle = $('.purchase-toggle'),
    $coffeeInd = $('.coffee-ind'),
    $buyBtn = $('.buy-btn'),
    $coffeePrice = $('.coffee-price'),
    $merchIndBack = $('.merch-ind .back'),
    $size = $merchIndBack.children('.size'),
    $backToTop = $('.back-to-top, .title, .footer-logo'),
    $title = $('.title'),
    $contact = $('.contact'),
    $placeHolder = $('.place-holder'),
    $landing = $('.landing'),
    $landingHead = $landing.find('.landing-head'),
    $landingNotHead = $landing.find('.landing-not-head'),
    $landingTogglers = $landing.find('.dream, .product'),
    $downAnim = $landing.find('.down-anim'),
    $contactImg = $('.contact-img'),
    $contactSub = $('.contact-sub'),
    $contactSubInside = $contactSub.find('.contact-sub-inside');

// Getting back end data
var coffee = [],
    merch = [],
    contact = {};

$.get('/api/info', function(data) {
    coffee = data.coffee.product;
    merch = data.merch;
    contact = data.contact;
    mapLoad(data.addresses); // Addresses array for map markers
});

// UI Functionality
var main = function() {
    //// Landing Section
    $landingTogglers.click(function() {
        var notSelImg;
        var tempThis; //for storing context
        if (!$(this).hasClass('landing-active')) {
            if (!$landingHead.hasClass('fade-out')) {
                $landingHead.addClass('fade-out');
                $(this).toggleClass('landing-active');
                tempThis = this;
                if ($(this).hasClass('dream')) {
                    notSelImg = $('.landing-img').not('.show');
                    $('.landing-img.show').toggleClass('show');
                    setTimeout(function() {
                        $(tempThis).children('.full').toggleClass('show');
                        notSelImg.toggleClass('show');
                    }, 500);
                } else {
                    setTimeout(function() {
                        $(tempThis).children('.full').toggleClass('show');
                    }, 400);
                }
            } else {
                var $startLandingActive = $('.landing-active');
                $startLandingActive.toggleClass('landing-active');
                $startLandingActive.children('.full').toggleClass('show');
                $(this).toggleClass('landing-active');
                tempThis = this;
                notSelImg = $('.landing-img').not('.show');
                $('.landing-img.show').toggleClass('show');
                setTimeout(function() {
                    $(tempThis).children('.full').toggleClass('show');
                    notSelImg.toggleClass('show');
                }, 500);
            }
        }
    });

    $downAnim.click(function() {
        $('html, body').animate({
            scrollTop: titleTop
        }, titleTop - $(window).scrollTop() * 0.8);
    });

    // Get price type
    var purchTypeVal = $('.active-purch-type').attr('id');

    // Toggle between Subscription vs. One-Time Purchase
    $purchaseToggle.click(function() {
        if (!$(this).hasClass('active-purch-type')) {
            $purchaseToggle.each(function() {
                $(this).toggleClass('active-purch-type');
            });
            purchTypeVal = $(this).attr('id');
            $buyBtn.find('.button-text').html(purchTypeVal.slice(0, 1).toUpperCase() + purchTypeVal.slice(1));
            $coffeePrice.each(function(index, val) {
                $(this).html('$' + coffee[index][purchTypeVal]);
                var currVal = $($buyBtn[index]).attr('href').slice(0, $($buyBtn[index]).attr('href').lastIndexOf("-") + 1);
                $($buyBtn[index]).attr('href', currVal + purchTypeVal);
            });
        }
    });

    $coffeeInd.click(function() {
        if (!$(this).hasClass('active-coffee-amount')) {
            $('.active-coffee-amount').toggleClass('active-coffee-amount');
            $(this).children('.coffee-ind-inside').toggleClass('active-coffee-amount');
        }
    });

    //// Merch Section
    $size.mouseenter(function() {
        $(this).parent().children('.t-shirt').first().attr('data-size', $(this).text());
        if (!$(this).hasClass('active')) {
            $(this).parent().children('.size.active').toggleClass('active');
            $(this).toggleClass('active');
        }
        var buyMerchBtn = $(this).parent().children('.buy-merch').first();
        buyMerchBtn.attr('href', buyMerchBtn.attr('href').slice(0,buyMerchBtn.attr('href').lastIndexOf('_')+1)+$(this).text());
    });
    //

    //// Contact Section
    //function for sliding box on text change in contact section
    var slideSwitchText = function(val) {
    $contactSubInside.toggleClass('show');
        setTimeout(function(){
            $contactSubInside.text(val);
            $contactSubInside.toggleClass('show');
            $contactSub.innerWidth($contactSubInside.width());
        },525);
    };

    //run once to initialize
    $contactSub.innerWidth($contactSubInside.width());

    $contactImg.mouseenter(function() {
        var selected = $(this).attr('class').split(' ')[1];
        if ($contactSubInside.text() !== contact[selected].text) {
            $contactSub.attr('href', contact[selected].link);
            if (!!contact[selected].link === $contactSub.hasClass('disable-link')) $contactSub.toggleClass('disable-link');
            slideSwitchText(contact[selected].text);
        }
    });

    //// back to top button on map
    $backToTop.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, $(window).scrollTop() * 2);
    });
};


// Load Google Maps
function mapLoad(addresses) {
    $.getJSON('//maps.googleapis.com/maps/api/geocode/json?address=' + addresses[0] , null, function(centerData) {
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
            $.getJSON('//maps.googleapis.com/maps/api/geocode/json?address=' + val, null, function(data) {
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
                    map.panTo(marker.getPosition());
                });

                // google.maps.event.addListener(infowindow, 'closeclick', function() {
                //     map.setCenter(marker.getPosition());
                // });

                if (index > 0) map.fitBounds(bounds);
            });
        });
    });
}

// Store page height of top of title
var titleTop = Math.ceil($landing.outerHeight()),
    contactTop = Math.ceil($contact.offset().top) * 0.92,
    downAnimReached = titleTop * 0.395 + 4.5; //when Page position is such that the white "CafeJefe" is right above the down arrow;

console.log('heyy');

// Handle fixing title bar at the top of the page
var listeners = function() {
    console.log('happening');

    var pagePos = 0,
        titleHeight = 0,
        titleFixed = false,
        landingHeadDimmed = false,
        topTextShowing = true,
        contactPopped = false;

    var landingScroll = function() {
        pagePos = window.pageYOffset; //calculates current vertical scroll position
        //fixes main title to top of page
	if (pagePos >= titleTop && !titleFixed || pagePos < titleTop && titleFixed) {
            $title.toggleClass('sticky');
            $placeHolder.toggleClass('no-show');
            titleFixed = !titleFixed;
        }

        console.log('contactTop', contactTop);
        console.log('contactPopped', contactPopped);

        //make contact pop
        if (pagePos >= contactTop && !contactPopped || pagePos < contactTop && contactPopped) {
            $contact.toggleClass('poppin');
            contactPopped = !contactPopped;
        }

        //dims top title once below DownAnim
        if (pagePos >= downAnimReached && !landingHeadDimmed || pagePos < downAnimReached && landingHeadDimmed) {
            $landingHead.toggleClass('dim');
            landingHeadDimmed = !landingHeadDimmed;
        }
        //fades all but title with scroll
        if (pagePos < downAnimReached && !topTextShowing) topTextShowing = true;
        if (pagePos === 0) $landingNotHead.add($downAnim).css('opacity', 1);
        else if (pagePos >= downAnimReached && topTextShowing) $landingNotHead.add($downAnim).css('opacity', +(topTextShowing = false));
        else if (pagePos > 0 && pagePos < downAnimReached) $landingNotHead.add($downAnim).css('opacity', 1 - pagePos / downAnimReached);
    };
    landingScroll();

    //Re-measure title distance from top of screen if screen is resized
    $(window).resize(function() {
        titleTop = Math.ceil($landing.outerHeight());
        downAnimReached = titleTop * 0.395 + 4.5;
        contactTop = Math.ceil($contact.offset().top) * 0.905;
        landingScroll();
    });
    window.addEventListener('scroll', landingScroll);
};

$(document).ready(main, listeners());
