const CACHE_NAME = 'middle-game-2d-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Открыт кэш');
                return cache.addAll(URLS_TO_CACHE);
            }),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((res) => {
              //TODO Создать white-list или признаки по которым будем получать только нужные для кэширование запросы
                if (res) {
                    return res;
                }
                return fetch(e.request);
            }),
    )
});

self.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});