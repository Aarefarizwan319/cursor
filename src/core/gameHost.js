import { storage } from './storage.js';

let overlayEl, containerEl, titleEl;
let currentGame = null;
let paused = false;
let currentGameMeta = null;
let tournamentQueue = null; // array of game metas

function showOverlay(show) {
  overlayEl.classList.toggle('hidden', !show);
}

async function loadGame(gameId) {
  if (currentGame?.destroy) {
    try { currentGame.destroy(); } catch {}
  }
  currentGame = null;
  containerEl.innerHTML = '';
  const registry = await import('../games/index.js');
  const createGame = registry.getCreateGame(gameId);
  if (!createGame) throw new Error('Game not found: ' + gameId);
  const mount = document.createElement('div');
  mount.style.position = 'relative';
  mount.style.width = '100%';
  mount.style.height = '100%';
  containerEl.appendChild(mount);
  currentGame = createGame({ mount, storage, haptics: vibrate });
  paused = false;
}

function attachUi() {
  overlayEl = document.getElementById('game-overlay');
  containerEl = document.getElementById('game-container');
  titleEl = document.getElementById('game-title');
  document.getElementById('btn-game-exit').addEventListener('click', () => gameHost.exit());
  document.getElementById('btn-game-pause').addEventListener('click', () => gameHost.togglePause());
  document.getElementById('btn-game-fullscreen').addEventListener('click', () => gameHost.toggleFullscreen());
  document.getElementById('btn-game-leaderboard').addEventListener('click', () => gameHost.showLeaderboard());
}

export const gameHost = {
  ensureUi() { if (!overlayEl) attachUi(); },
  async play(game) {
    this.ensureUi();
    titleEl.textContent = game.title || 'Game';
    showOverlay(true);
    currentGameMeta = game;
    await loadGame(game.id);
    storage.pushToList('recent', { id: game.id, t: Date.now() }, 5);
  },
  exit() {
    showOverlay(false);
    if (currentGame?.destroy) try { currentGame.destroy(); } catch {}
    currentGame = null;
    if (tournamentQueue && tournamentQueue.length) {
      const next = tournamentQueue.shift();
      if (next) this.play(next);
      if (!tournamentQueue.length) tournamentQueue = null;
    }
  },
  togglePause() {
    if (!currentGame?.pause || !currentGame?.resume) return;
    paused = !paused;
    if (paused) currentGame.pause(); else currentGame.resume();
  },
  toggleFullscreen() {
    const frame = containerEl?.parentElement?.parentElement;
    if (!frame) return;
    if (!document.fullscreenElement) {
      frame.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
  ,
  showLeaderboard() {
    if (!currentGameMeta) return;
    const key = `scores.${currentGameMeta.id}`;
    const data = storage.get(key, { best: 0, top: [] });
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
      <div class="profile-card">
        <h3>🏆 ${currentGameMeta.title} Leaderboard</h3>
        <ol>${data.top.map(x=>`<li>${x.name || 'Player'} — ${x.score}</li>`).join('') || '<li>No scores yet</li>'}</ol>
        <div class="actions"><button id="close">Close</button></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('#close').addEventListener('click', () => document.body.removeChild(modal));
  },
  startTournament(games){ tournamentQueue = games.slice(1); this.play(games[0]); }
};

function vibrate(pattern){
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch {}
}


