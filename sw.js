let isWebpSupported
const version = '2.8.1';
const CACHE_NAME = 'owlzone-sw-cache::v' + version;
const urlsToCache = [
  '/',
  '/assets/img/code.svg',
  '/assets/js/home.min.js',
  '/assets/js/bundle.min.js',
  '/assets/font/nuFlD-vYSZviVYUb_rj3ij__anPXBb__lW4e5g.woff2',
];

async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      supportsWebp().then(bool => isWebpSupported = bool);
      console.log(supportsWebp(), isWebpSupported)
      urlsToCache.push('/assets/img/owl-and-rat' + (isWebpSupported ? '.webp' : '.jpg'));
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