/* header.js */
(function opacityPercentage() {
  var $header = $("#header"),
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
          $sidebar.addClass('fixed').css('top', '50px');
      } else if ( pageYOffset < 280 && $sidebar.hasClass('fixed') ) {
          $sidebar.removeClass('fixed');
      }
  }
})();


(function toggleNav() {
  var $item = $("#nav-main")
    , $icon = $("#nav-icon")
    , $overlay = $('.opacity-overlay')

  $icon.on("click", function (e) {
      $item.toggleClass("nav-dropdown");
  });

  document.addEventListener("click", function (e) {
      var isClickInside = $icon[0].contains(e.target);

      if (!isClickInside) {
          $item.removeClass("nav-dropdown");
          $overlay.removeClass("overlay-display").removeClass("overlay-finale");
      }
  });
})();

(function toggleOverlay() {
var icon = document.getElementById("nav-icon")
  , overlay = document.getElementsByClassName('opacity-overlay')[0]

  icon.addEventListener('click', function () {
    if (!overlay.classList.contains('overlay-display')) {
        overlay.classList.add('overlay-display');
        setTimeout(function () {
            overlay.classList.toggle('overlay-finale');
        }, 500);
    } else {
        overlay.classList.remove('overlay-display', 'overlay-finale');
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

  function toggle() {
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

(function appendBorderColor() {
    var safeColor = ["#1abc9c","#2ecc71","#9b59b6","#3498db","#e74c3c","#e67e22", "#7f8c8d", "#ffbe76", "#f6e58d", "#95afc0"];
    var $titles = $('.has-top-border');

    $titles.each(function (i, el) {
        el.style.borderTopColor = generateRandomColor(safeColor);
    });

    function generateRandomColor(colors) {
        var len = colors.length,
            randomNumber = Math.floor(len * Math.random()),
            randomColor = colors[randomNumber];
        return randomColor;
    }
})();

(function switchTab() {
    var $tabs = $('.widget-tab'),
        $category = $('.post-category'),
        $tags = $('.post-tags');

    $tabs.each(function (i, el) {
        $(this).on('click', function () {
            $tabs.removeClass('active');
            $(this).addClass('active');
            if ($($tabs[1]).hasClass('active')) {
                $category.hide();
                $tags.show();
            } else {
                $tags.hide();
                $category.show();
            }
        })
    });
})();