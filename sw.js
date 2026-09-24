// Service Worker del Informador IA - COEESCV (v2)
// Estrategia: caché primero para los archivos estáticos propios.
// Cada recurso se cachea por separado: si uno falla, el resto sigue funcionando.
// IMPORTANTE: nunca intercepta la llamada al Worker (cross-origin),
// así las respuestas de la IA siempre son en directo.

const CACHE = "coeescv-ia-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./imagen_logo.jpg",
  "./imagen_fondo.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((asset) => cache.add(asset)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Solo GET del mismo origen (GitHub Pages). La API del Worker va siempre a red.
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
