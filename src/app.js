import { router } from './router.js';
import { storage } from './core/storage.js';
import { audio } from './core/audio.js';
import { gameHost } from './core/gameHost.js';
import { settings } from './core/settings.js';

// Init
document.getElementById('year').textContent = String(new Date().getFullYear());

// Theme
const savedTheme = storage.get('settings.theme', 'dark');
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('btn-theme').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  storage.set('settings.theme', next);
});

// Audio
document.getElementById('btn-music').addEventListener('click', () => audio.toggleMusic());
document.getElementById('btn-sfx').addEventListener('click', () => audio.toggleSfx());
document.getElementById('btn-next').addEventListener('click', () => audio.next());
document.getElementById('btn-prev').addEventListener('click', () => audio.prev());

// Profile
document.getElementById('btn-profile').addEventListener('click', () => {
  router.navigate('/profile');
});

// Routing via data-route buttons
document.querySelectorAll('[data-route]').forEach(el => {
  el.addEventListener('click', (e) => {
    const route = el.getAttribute('data-route');
    if (route) router.navigate(route);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); gameHost.togglePause(); }
  if (e.key?.toLowerCase() === 'm') { e.preventDefault(); audio.toggleMusic(); }
  if (e.key?.toLowerCase() === 'f') { e.preventDefault(); gameHost.toggleFullscreen(); }
});

// Start
router.init();
audio.init();
audio.onTrackChanged = (name) => {
  const el = document.getElementById('now-playing');
  if (el) el.textContent = name ? `Now Playing: ${name}` : '';
};
settings.init();

// PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}


