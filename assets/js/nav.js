(function toggleNav() {
	var item = document.getElementById('nav-main'),
		icon = document.getElementById('nav-icon');

	icon.addEventListener('click', function() {
		if(item.className === 'nav-main') {
			item.className += ' nav-dropdown';
		} else {
			item.className = 'nav-main';
		}
	}, false);
})();

(function toggleSearch() {
	var scope = document.getElementById('trigger-search'),
		close = document.getElementById('collapse-search'),
		bar = document.getElementById('search-field'),
		logo = document.getElementsByClassName('logo')[0];

	scope.addEventListener('click', function() {
		this.className += ' search-hidden';
		close.className += ' search-visible';
		bar.className += ' search-visible';
		logo.className += ' logo-responsive';
	}, false);

	close.addEventListener('click', function() {
		this.className = 'search-close';
		scope.className = 'search-scope';
		bar.className = 'search-field';
		logo.className = 'logo';
	}, false);
})();

(function flexGallery() {
	var el = document.getElementsByClassName('js-img-gallery')[0],
		preString = "<li><a href='#'><img class='gallery-img' src='assets/img/gallery/",
		postString = "'></a></li>";

	// var xhr = new XMLHttpRequest();
	// xhr.open('GET', 'gallery.json', true);
	// xhr.send(null);
	// xhr.onreadystatechange = function() {
	// 	if (xhr.readystate == 4 && xhr.status === 200) {
	// 		attachHtml();
	// 	}
	// };

	function attachHtml() {
		// if innerHTML exists, remove it for redrawing.
		el.innerHTML = "";

		// push at least 4 images.
		for(var i = 0; i < 4; i++) {
			el.innerHTML += preString + galleryData[i] + postString;()
		}

		// push additional images according to innerWidth.
		var width = 385;
		for(var j = 4; j < 12; j++) {
			if (window.innerWidth > width) {
				el.innerHTML += preString + galleryData[j] + postString;
				width += 75;
			}
		}
	}
	attachHtml();

	// if window has resized, invoke attachHtml.
	window.addEventListener("resize", attachHtml);
})();

(function codeBanner() {
	var el = document.getElementsByClassName('highlight');
	var langList = [];
	for(var i = 0; i < el.length; i++) {
		langList.push(el[i].firstChild.firstChild.dataset.lang);
		el[i].setAttribute('data-lang', langList[i]);
	}
})();
