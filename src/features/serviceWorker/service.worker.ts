const _self = self as unknown as ServiceWorkerGlobalScope;

const date = new Date();
const firstJan = new Date(date.getFullYear(), 0, 1);
const version = [
  'v',
  date.getFullYear(),
  Math.floor((date.getTime() - firstJan.getTime()) / (1000 * 60 * 60 * 24 * 7)),
].join('.');
const cachePrefix = 'newsfeed-cache';
const cacheName = cachePrefix + '_' + version;

_self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        'https://frontend.karpovcourses.net/api/v2/ru/news',
        'https://frontend.karpovcourses.net/api/v2/ru/trends',
        `https://frontend.karpovcourses.net/api/v2/ru/news/6`,
      ]);
    })
  );
});

_self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)));
    })
  );
});

_self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isRequestInterceptable = url.startsWith('http') && event.request.method.toUpperCase() === 'GET';
  if (isRequestInterceptable) {
    event.respondWith(
      (async () => {
        const request = event.request;
        const isHtmlPage = request.headers.get('Accept')?.indexOf('text/html') !== -1 && url.startsWith(_self.origin);
        const isCacheFirstRequest =
          !isHtmlPage &&
          (request.headers.get('Accept')?.indexOf('image/') !== -1 ||
            (url.startsWith(_self.origin) && url.match(/(\.js|\.css)$/)) ||
            url.match(/(\.woff.)$/));
        const requestKey = isHtmlPage ? '/' : request;
        try {
          if (isCacheFirstRequest) {
            const cacheItem = await caches.match(requestKey);
            if (cacheItem) {
              return cacheItem;
            }
          }
          const response = await fetch(requestKey);
          const cache = await caches.open(cacheName);
          await cache.put(requestKey, response.clone());
          return response;
        } catch (error) {
          const cacheItem = await caches.match(requestKey);
          if (cacheItem) {
            return cacheItem;
          }
        }
        return new Response('', {
          status: 502,
          statusText: 'No internet connection',
        });
      })()
    );
  }
});
