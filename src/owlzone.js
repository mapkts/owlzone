(function () {
  var header = $('#header');
  var topbar = $('.header-topbar');
  var mask = $('.opacity-mask');
  var navMain = $('#nav-main');
  var navIcon = $('#nav-icon');
  var overlay = $('.opacity-overlay');
  var searchScope = $('#trigger-search');
  var searchClose = $('#collapse-search');
  var searchBar = $('#search-field');
  var logo = $('.logo');
  var highlights = $$('div.highlighter-rogue');
  var height = header.getBoundingClientRect().height - topbar.getBoundingClientRect().height;
  var ticking = false;
  var resized = false;
  var cond = true;
  var opacity;

  applyOpacity();
  setCodeBanners(highlights);

  $.pipe(
    // Apply opacity when window scrolled and resized, and fix sidebar if pageYOffset > 280
    $.on('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(applyOpacity);
        ticking = true;
      }
    }),
    $.on('resize', function () {
      if (cond) {
        if (resized) {
          resized = false;
          // Need to re-calculate animation height when window resized
          height = header.getBoundingClientRect().height - topbar.getBoundingClientRect().height;
          applyOpacity();
        }

        // Only invoke once per second
        cond = false;
        setTimeout(function () {
          cond = true;
        }, 1000);
      }
    }),


    // Toggle nav when click hamburger icon
    $.find(navIcon),
    $.on('click', function () {
      $.toggleClass('nav-dropdown', navMain);
      $.toggleClass('no-scroll', document.body);
    }),
    // Toggle overlay when mobile nav menu is visible
    $.on('click', function () {
      if (!$.hasClass('overlay-display', overlay)) {
        $.addClass('overlay-display', overlay);
        setTimeout(function () {
          $.addClass('overlay-finale', overlay);
        }, 500);
      } else {
        overlay.classList.remove('overlay-display', 'overlay-finale');
      }
    }),
    // Collapse nav if click elsewhere
    $.find(document),
    $.on('click', function (evt) {
      var isClickInside = navIcon.contains(evt.target);
      if (!isClickInside) {
        [
          ['nav-dropdown', navMain],
          ['no-scroll', document.body],
          ['overlay-display', overlay],
          ['overlay-finale', overlay],
        ].forEach(function (arr) {
          $.removeClass.apply(null, arr);
        });
      }
    }),


    // Toggle and collapse search
    $.find(searchScope),
    $.on('click', function toggleSearch() {
      [
        ['search-hidden', searchScope],
        ['search-visible', searchClose],
        ['search-visible', searchBar],
        ['logo-responsive', logo]
      ].forEach(function (arr) {
        $.addClass.apply(null, arr);
      })
    }),
    $.find(searchClose),
    $.on('click', function collapseSearch() {
      [
        ['search-hidden', searchScope],
        ['search-visible', searchClose],
        ['search-visible', searchBar],
        ['logo-responsive', logo]
      ].forEach(function (arr) {
        $.removeClass.apply(null, arr);
      })
    })
  )(window);

  function applyOpacity() {
    opacity = pageYOffset / height;
    if (opacity <= 1) {
      $.css({
        'opacity': opacity
      }, mask)
      $.removeClass('topbar-shadow', topbar);
    } else {
      $.addClass('topbar-shadow', topbar);
    }
    ticking = false;
  }

  function setCodeBanners(elems) {
    var languages = {
      text: 'Remark',
      html: 'HTML',
      css: 'CSS',
      js: 'JavaScript',
      ts: 'TypeScript',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
    };

    elems.forEach(function (el) {
      el.classList.forEach(function (cls) {
        var match = /language-(.+)/.exec(cls);
        if (match != null) {
          $.attr({'data-lang': languages[match[1]]}, el.firstChild);
        }
      })
    });
  }
})();
