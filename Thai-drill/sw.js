// シンプルな静的キャッシュ（サブフォルダ専用）
const CACHE_NAME = "Thai-drill-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // まずキャッシュ、なければネット（Cache-first）
  e.respondWith(
    caches.match(req).then((res) => res || fetch(req))
  );
});
