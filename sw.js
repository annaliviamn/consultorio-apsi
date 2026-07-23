const CACHE_NAME = 'consultorio-apsi-v2';
const urlsParaCachear = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/firebase-config.js',
  '/manifest.json',
  '/assets/logo.jpg',
  '/assets/icons/icon-192.jpg',
  '/assets/icons/icon-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsParaCachear);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resposta) => {
      return resposta || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomes) => {
      return Promise.all(
        nomes.filter((nome) => nome !== CACHE_NAME)
             .map((nome) => caches.delete(nome))
      );
    })
  );
});