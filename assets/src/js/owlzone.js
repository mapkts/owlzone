(function () {
  var header = $('#header');
  var topbar = $('.header-topbar');
  var mask = $('.opacity-mask');
  var sidebar = $('.widget-area');
  var navMain = $('#nav-main');
  var navIcon = $('#nav-icon');
  var overlay = $('.opacity-overlay');
  var searchScope = $('#trigger-search');
  var searchClose = $('#collapse-search');
  var searchBar = $('#search-field');
  var logo = $('.logo');
  var highlights = $$('highlight');
  var height = header.getBoundingClientRect().height - topbar.getBoundingClientRect().height;
  var ticking = false;
  var resized = false;
  var cond = true;
  var opacity;

  applyOpacity();
  setCodeBanners();
  appendBorderTopColor();

  $.pipe(
    // Apply opacity when window scrolled and resized, and fix sidebar if pageYOffset > 280
    $.on('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(applyOpacity);
        requestAnimationFrame(fixSidebar);
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
    }),


    // Tab switching
    function switchTab() {
      var tabs = $$('.widget-area');
      var tabCates = $('.post-category');
      var tabTags = $('.post-tags');

      tabs.forEach(function (el) {
        $.on('click', function (el) { switcher(el); }, el);
      })

      function switcher(tab) {
        $.removeClass('active', tabs);
        tab.addClass('active', tab);
        if ($.hasClass('active', tabs[1])) {
          tabCates.hide();
          tabTags.show();
        } else {
          tabCates.show();
          tabTags.hide();
        }
      }
    }
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

  function fixSidebar() {
    if (pageYOffset > 280 && !$.hasClass('fixed', sidebar)) {
      $.pipe($.addClass('fixed'), $.css({
        'top': '50px'
      }))(sidebar);
    } else if (pageYOffset < 280 && $.hasClass('fixed', sidebar)) {
      $.removeClass('fixed', sidebar);
    }
  }

  function setCodeBanners() {
    var normalizedLanguages = {
      html: 'HTML',
      css: 'CSS',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
    };

    highlights.forEach(function (el) {
      el.setAttribute('data-lang', normalizeLang(el.fisrtChild.firstChild.dataset.lang));
    })

    function normalizeLang(src) {
      if (src in normalizedLanguages) {
        return normalizedLanguages[src];
      }
      return src;
    }
  }

  function appendBorderTopColor() {
    // Ten colors would be sufficient enough because we only display ten posts in home page
    var colors = ["#1abc9c","#2ecc71","#9b59b6","#3498db","#e74c3c","#e67e22", "#7f8c8d", "#ffbe76", "#f6e58d", "#95afc0"];
    var titles = $$('.has-top-border');

    titles.forEach(function (el, i) {
      $.css({'border-top-color': colors[i]});
    });
  }
})();