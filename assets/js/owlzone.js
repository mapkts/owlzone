/* header.js */
(function opacityPercentage() {
	var $header = $(".header"),
		$topbar = $(".header-topbar"),
		$mask = $(".opacity-mask"),
		$sidebar = $('.widget-area'),
		$window = $(window),
		animateHeight = $header.rect().height - $topbar.rect().height,
		opacity, reset,
		ticking = false,
		resized = false;

	$window.on("scroll", function () {
		requestTick();
	});

	// fix issues: reflesh page and resize window.
	applyOpacity();

    $window.on("resize", function () {
        resized = true;
	});

	setInterval(function () {
		if (resized) {
			resized = false;
			animateHeight = $header.rect().height - $topbar.rect().height;
			applyOpacity();
		}
	}, 2000)

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(applyOpacity);
			requestAnimationFrame(fixSidebar);
			ticking = true;
		}
	}

	function applyOpacity() {
		opacity = pageYOffset/animateHeight;
		if (opacity <= 1) {
			$mask.css("opacity", opacity);
			$topbar.removeClass("topbar-shadow");
		} else {
			$topbar.addClass("topbar-shadow");
		}
		ticking = false;
	}

	function fixSidebar() {
		if ( pageYOffset > 280 && !$sidebar.hasClass('fixed') ) {
			$sidebar.addClass('fixed').css('top', '50px').css('width', 'auto');
		} else if ( pageYOffset < 280 && $sidebar.hasClass('fixed') ) {
			$sidebar.removeClass('fixed');
		}
	}
})();


(function toggleNav() {
	var $item = $("#nav-main"),
		$icon = $("#nav-icon");

	$icon.on("click", function (e) {
		$item.toggleClass("nav-dropdown");
	});

	document.addEventListener("click", function (e) {
		var isClickInside = $icon[0].contains(e.target);

		if (!isClickInside) {
			$item.removeClass("nav-dropdown");
		}
	});
})();


(function toggleSearch() {
	var $scope = $('#trigger-search'),
		$close = $('#collapse-search'),
		$bar = $('#search-field'),
		$logo = $('.logo');

	$scope.on('click', toggle);
	$close.on('click', collapse);

	function toggle(e) {
		$scope.addClass('search-hidden');
		$close.addClass('search-visible');
		$bar.addClass('search-visible');
		$logo.addClass('logo-responsive');
	}

	function collapse() {
		$scope.removeClass('search-hidden');
		$close.removeClass('search-visible');
		$bar.removeClass('search-visible');
		$logo.removeClass('logo-responsive');
	}
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

