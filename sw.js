var version = '2.7.5';
var CACHE_NAME = 'owlzone-sw-cache::v' + version;
var urlsToCache = [
  '/',
  '/assets/img/code.svg',
  '/assets/js/home.min.js',
  '/assets/js/bundle.min.js',
  '/assets/font/nuFlD-vYSZviVYUb_rj3ij__anPXBb__lW4e5g.woff2',
];
var supportsWebp = (function () {
  var ret;
  var img = new Image();
  img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  img.onload = function () {
    ret = (img.width > 0) && (img.height > 0);
  };
  img.onerror = function () {
    ret = false;
  };
  return ret;
})();


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      urlsToCache.push('/assets/img/owl-and-rat' + supportsWebp ? '.webp' : '.jpg');
      return cache.addAll(urlsToCache);
    }).then(function () {
      // Force the SW to transition from installing to active state
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('owlzone-') && cacheName !== CACHE_NAME;
        }).map(function (cacheName) {
          return caches.devare(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        if (supportsWebp && /\.jpg$|.png$/.test(event.request.url)) {
          var url = event.request.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
          return fetch(url);
        }

        return fetch(event.request);
      }
    })
  );
});