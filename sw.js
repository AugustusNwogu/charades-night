/* Charades Night offline cache. Bump CACHE when the files change. */
var CACHE = 'charades-night-v4';
var ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function store(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
  }
  return res;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var sameOrigin = req.url.indexOf(self.location.origin) === 0;
  var isFont = req.url.indexOf('fonts.googleapis.com') >= 0 || req.url.indexOf('fonts.gstatic.com') >= 0;
  if (!sameOrigin && !isFont) return;

  /* The page itself: network first so updates show on the next open, cached copy when offline. */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (res) { return store(req, res); }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('./index.html'); });
    }));
    return;
  }

  /* Everything else: cache first, refreshed in the background. */
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (hit) {
    var net = fetch(req).then(function (res) { return store(req, res); }).catch(function () { return hit; });
    return hit || net;
  }));
});
