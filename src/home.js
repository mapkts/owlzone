(function () {
  'use strict';

  onScroll();
  tabSwitcher();
  appendBorderTopColor();
  appendSvgs(S.icons);


  function onScroll() {
    var ticking = false;
    var sidebar = $('.widget-area');

    $.on('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          fixSidebar();
          ticking = false;
        });
        ticking = true;
      }
    }, window);

    function fixSidebar() {
      if (pageYOffset > 280 && !$.hasClass('fixed', sidebar)) {
        $.pipe($.addClass('fixed'), $.css({
          'top': '50px'
        }))(sidebar);
      } else if (pageYOffset < 280 && $.hasClass('fixed', sidebar)) {
        $.removeClass('fixed', sidebar);
      }
    }
  }

  function tabSwitcher() {
    var tabs = $$('.widget-tab');
    var tabCates = $('.post-category');
    var tabTags = $('.post-tags');

    tabs.forEach(function (tab) {
      $.on('click', function switcher() {
        $.removeClass('active', tabs);
        $.addClass('active', tab);
        if ($.hasClass('active', tabs[1])) {
          $.hide(tabCates);
          $.show(tabTags);
        } else {
          $.show(tabCates);
          $.hide(tabTags);
        }
      }, tab);
    })
  }

  function appendBorderTopColor() {
    // Ten colors is sufficient enough as we only display ten posts in home page
    var colors = ["#95afc0", "#2ecc71", "#9b59b6", "#3498db", "#e74c3c", "#e67e22", "#7f8c8d", "#ffbe76", "#f6e58d",
      "#1abc9c"
    ];
    var titles = $$('.has-top-border');

    titles.forEach(function (el, i) {
      $.css({
        'border-top-color': colors[i]
      }, el);
    });
  }

  function appendSvgs(icons) {
    var tags = $$(".post-info .tag");
    tags.forEach(function (el) {
      var tag = el.className.slice(4);
      if (tag in icons) {
        el.innerHTML = icons[tag];
      }
    })
  }
})();