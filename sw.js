const CACHE = 'gamehub-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './src/app.js',
  './src/router.js',
  './src/core/storage.js',
  './src/core/audio.js',
  './src/core/gameHost.js',
  './src/core/settings.js',
  './src/core/progression.js',
  './src/core/input.js',
  './src/views/home.js',
  './src/views/games.js',
  './src/views/about.js',
  './src/views/contact.js',
  './src/views/settings.js',
  './src/views/modes.js',
  './src/views/profile.js',
  './src/games/snake.js',
  './src/games/index.js',
  './src/games/flappy.js',
  './src/games/2048.js',
  './src/games/pong.js',
  './src/games/breakout.js',
  './src/games/ttt.js',
  './src/games/connect4.js',
  './src/games/memory.js',
  './src/games/rps.js',
  './src/games/guess.js',
  './src/games/hangman.js',
  './src/games/runner.js',
  './src/games/mole.js',
  './src/games/tiles.js',
  './src/games/balloon.js',
  './src/games/slide15.js',
  './src/games/dice.js',
  './src/games/fishing.js',
  './src/games/doodle.js',
  './src/games/math.js',
  './src/games/gk.js',
  './src/games/maze.js',
  './src/games/space.js',
  './src/games/gallery.js',
  './src/games/trivia.js',
  './src/games/tangram.js',
  './src/games/bubble.js',
  './src/games/jetpack.js',
  './src/games/scramble.js',
  './src/games/domino.js',
  './manifest.webmanifest',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/music/track1.mp3',
  './assets/music/track2.mp3',
  './assets/music/track3.mp3',
  './assets/sfx/coin.mp3',
  './assets/sfx/lose.mp3',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
      return res;
    }).catch(() => cached))
  );
});


