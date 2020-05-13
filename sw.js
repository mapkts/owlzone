const version = '2.10.0';
const CACHE_NAME = 'owlzone-sw-cache::v' + version;
const urlsToCache = [
  '/favicon.ico',
  '/assets/img/code.svg',
  '/assets/js/home.min.js',
  '/assets/js/bundle.min.js',
];

let isWebpSupported
async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return supportsWebp().then(function (bool) {
        isWebpSupported = bool;
        urlsToCache.push('/assets/img/owl-and-rat' + (isWebpSupported ? '.webp' : '.jpg'));
      }).then(function () {
        cache.addAll(urlsToCache);
      });
    }).then(function () {
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
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});