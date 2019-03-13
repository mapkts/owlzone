var version = '2.6.5';
var urlsToCache = [
  '/',
  '/assets/font/',
  '/assets/js/scripts.min.js',
  '/assets/img/owl-and-rat.jpg',
  '/assets/img/owl-and-rat.webp',
  '/assets/img/code.svg',
];
var CACHE_NAME = 'owlzone-sw-cache::v' + version;

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(urlsToCache);
    }).then(function() {
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
          return caches.delete(cacheName);
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
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});