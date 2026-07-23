const CACHE_NAME = 'consultorio-apsi-v2';
const urlsParaCachear = [
  '/consultorio-apsi/',
  '/consultorio-apsi/index.html',
  '/consultorio-apsi/style.css',
  '/consultorio-apsi/app.js',
  '/consultorio-apsi/firebase-config.js',
  '/consultorio-apsi/manifest.json',
  '/consultorio-apsi/assets/logo.jpg',
  '/consultorio-apsi/assets/icons/icon-192.png',
  '/consultorio-apsi/assets/icons/icon-512.png'
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