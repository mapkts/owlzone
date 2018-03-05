/* header.js */
(function opacityPercentage() {
	var $header = $(".site-header"),
		$topbar = $(".header-topbar"),
		$mask = $(".opacity-mask"),
		animateHeight = $header.rect().height - $topbar.rect().height,
		opacity, throttleScroll, resetHeight;

    $(window).bind("scroll", function () {
            clearTimeout(throttleScroll);

            throttleScroll = setTimeout(function () {
                opacity = pageYOffset/animateHeight;
                $mask.css("opacity", opacity);
                if (opacity >= 1) {
                    $(".header-topbar").addClass("topbar-shadow");
                } else {
                    $(".header-topbar").removeClass("topbar-shadow");
                }
        }, 10);
    });

    // if header height has been changed on resize, we need to reset this function;
    $(window).bind("resize", function () {
        clearTimeout(resetHeight);
        resetHeight = setTimeout(opacityPercentage, 1000);
    });
})();


(function toggleNav() {
	var $item = $("#nav-main"),
		$icon = $("#nav-icon"),
		$body = $("body");

	$icon.bind("click", function (e) {
		e.stopPropagation();
		$item.toggleClass("nav-dropdown");
	});

	$body.bind("click", function () {
		$item.removeClass("nav-dropdown");
	});
})();


(function toggleSearch() {
	var $scope = $('#trigger-search'),
		$close = $('#collapse-search'),
		$bar = $('#search-field'),
		$logo = $('.logo'),
		$body = $('body');

	$scope.bind('click', function() {
		$scope.addClass('search-hidden');
		$close.addClass('search-visible');
		$bar.addClass('search-visible');
		$logo.addClass('logo-responsive');
	});


	$close.bind('click', function() {
		$scope.removeClass('search-hidden');
		$close.removeClass('search-visible');
		$bar.removeClass('search-visible');
		$logo.removeClass('logo-responsive');
	});

	$body.bind('click', function() {
		$scope.removeClass('search-hidden');
		$close.removeClass('search-visible');
		$bar.removeClass('search-visible');
		$logo.removeClass('logo-responsive');
	});


})();


/* codeBanner.js */
(function codeBannerUtils() {
	var el = document.getElementsByClassName('highlight');
	var langList = [];
	for(var i = 0; i < el.length; i++) {
		langList.push(el[i].firstChild.firstChild.dataset.lang);
		el[i].setAttribute('data-lang', langList[i]);
	}
})();