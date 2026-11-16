const CACHE_NAME = 'adi-calc-v3';
const FILES_TO_CACHE = [
  './index.html',
  './calculator_Pressure.html',
  './calculator_Velocity.html',
  './manifest.json',
  './icon-192.jpg',
  './icon-512.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Принудительная активация новой версии
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // Мгновенный перехват управления
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
