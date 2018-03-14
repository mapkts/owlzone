/* header.js */
(function opacityPercentage() {
	var $header = $(".header"),
		$topbar = $(".header-topbar"),
		$mask = $(".opacity-mask"),
		$window = $(window),
		animateHeight = $header.rect().height - $topbar.rect().height,
		opacity, timer, reset,
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
			ticking = true;
		}
	}

	function applyOpacity() {
		opacity = pageYOffset/animateHeight;
		$mask.css("opacity", opacity);
		if (opacity >= 1) {
			$topbar.addClass("topbar-shadow");
		} else {
			$topbar.removeClass("topbar-shadow");
		}
		ticking = false;
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
// (function codeBannerUtils() {
// 	var el = document.getElementsByClassName('highlight');
// 	var langList = [];
// 	for(var i = 0; i < el.length; i++) {
// 		langList.push(el[i].firstChild.firstChild.dataset.lang);
// 		el[i].setAttribute('data-lang', langList[i]);
// 	}
// })();




(function appendSvgs() {
	var icons = {
		JavaScript: "<svg viewBox='0 0 128 128'><path fill='#F0DB4F' d='M1.408 1.408h125.184v125.185h-125.184z'></path><path fill='#323330' d='M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793h-11.709l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z'></path></svg>",
		Chrome: "<svg viewBox='0 0 128 128'><path fill-opacity='.1' d='M102.966 75.327c0-21.439-17.379-38.819-38.817-38.819s-38.818 17.38-38.818 38.819h11.09c0-15.314 12.415-27.727 27.727-27.727 15.313 0 27.727 12.413 27.727 27.727'></path><path fill='url(#b)' d='M119.602 36.508c-15.266-30.716-52.542-43.24-83.259-27.974-9.578 4.761-17.764 11.913-23.765 20.766l24.955 43.253c-4.597-14.606 3.521-30.174 18.127-34.77 2.567-.808 5.243-1.238 7.935-1.274'></path><path fill='url(#c)' d='M12.578 29.3c-19.1 28.492-11.486 67.071 17.005 86.171 8.814 5.909 18.997 9.461 29.575 10.319l26.063-44.363c-9.745 11.811-27.22 13.486-39.032 3.74-4.011-3.309-7.012-7.679-8.657-12.613'></path><path fill='url(#d)' d='M59.158 125.791c34.204 2.585 64.027-23.047 66.613-57.25.834-11.037-1.295-22.093-6.17-32.031h-56.006c15.312.07 27.67 12.541 27.598 27.854-.028 6.195-2.131 12.204-5.972 17.064'></path><path fill='url(#e)' d='M12.578 29.3l24.955 43.253c-1.849-6.221-1.457-12.893 1.107-18.854l-24.954-26.063'></path><path fill='url(#f)' d='M59.158 125.791l26.063-44.363c-4.112 4.904-9.794 8.233-16.082 9.426l-11.091 34.937'></path><path fill='url(#g)' d='M119.602 36.508h-56.007c8.436.039 16.396 3.918 21.626 10.537l35.491-8.873'></path></svg>",
		Webpack: "<svg viewBox='0 0 128 128'><path class='cls-1' d='M117.29,98.1,66.24,127V104.49L98,87,117.29,98.1Zm3.5-3.16V34.55L102.11,45.35V84.16l18.67,10.77ZM10.71,98.1l51,28.88V104.49L29.94,87Zm-3.5-3.16V34.55L25.89,45.35V84.16Zm2.19-64.3L61.76,1V22.76L28.21,41.21l-.27.15Zm109.18,0L66.24,1V22.76L99.79,41.2l.27.15,18.54-10.71Z'></path><path class='cls-2' d='M61.76,99.37,30.37,82.1V47.92L61.76,66Zm4.48,0L97.63,82.12V47.92L66.24,66ZM32.5,44,64,26.66,95.5,44,64,62.16,32.5,44Z'></path></svg>"
	}

	var tags = $(".post-tags .tag");
	tags.each(function (i, a) {
		var tag = a.className.slice(4);
		if (tag in icons) {
			a.innerHTML = icons[tag];
		}
	})
})();