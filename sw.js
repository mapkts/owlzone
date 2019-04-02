let isWebpSupported
const version = '2.7.6';
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
  event.waitUntil(async function () {
    isWebpSupported = await supportsWebp();
    urlsToCache.push('/assets/img/owl-and-rat' + isWebpSupported ? '.webp' : '.jpg');
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }).then(function () {
      // Force the SW to transition from installing to active state
      return self.skipWaiting();
    })
  });
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
      if (response) {
        return response;
      } else {
        if (isWebpSupported && /\.jpg$|.png$/.test(event.request.url)) {
          var url = event.request.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
          return fetch(url);
        }

        return fetch(event.request);
      }
    })
  );
});