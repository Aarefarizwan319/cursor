import { storage } from './storage.js';

const tracks = [
  { src: 'assets/music/track1.mp3', name: 'Arcade Dreams' },
  { src: 'assets/music/track2.mp3', name: 'Neon Runner' },
  { src: 'assets/music/track3.mp3', name: 'Pixel Nights' },
];

let audioEl; let sfxEnabled = true; let musicEnabled = true; let currentIndex = 0;

function load(index) {
  if (!audioEl) return;
  currentIndex = (index + tracks.length) % tracks.length;
  audioEl.src = tracks[currentIndex].src;
  if (musicEnabled) audioEl.play().catch(() => {});
  if (audio.onTrackChanged) audio.onTrackChanged(tracks[currentIndex].name);
}

export const audio = {
  init() {
    sfxEnabled = storage.get('settings.sfx', true);
    musicEnabled = storage.get('settings.music', true);
    audioEl = new Audio();
    audioEl.loop = false;
    audioEl.volume = 0.5;
    audioEl.addEventListener('ended', () => {
      load(currentIndex + 1);
    });
    if (musicEnabled) load(0);
  },
  toggleMusic() {
    musicEnabled = !musicEnabled;
    storage.set('settings.music', musicEnabled);
    if (!audioEl) return;
    if (musicEnabled) { if (!audioEl.src) load(0); else audioEl.play().catch(() => {}); }
    else { audioEl.pause(); }
  },
  toggleSfx() {
    sfxEnabled = !sfxEnabled;
    storage.set('settings.sfx', sfxEnabled);
  },
  playSfx(src) {
    if (!sfxEnabled) return;
    const el = new Audio(src);
    el.volume = 0.7;
    el.play().catch(() => {});
  },
  next() { load(currentIndex + 1); },
  prev() { load(currentIndex - 1); },
  onTrackChanged: null,
};


