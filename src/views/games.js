import { gameHost } from '../core/gameHost.js';
import { storage } from '../core/storage.js';

const GAMES = [
  { id: 'snake', title: 'Snake', cat: 'Arcade', emoji: '🐍' },
  { id: 'flappy', title: 'Flappy Bird', cat: 'Arcade', emoji: '🐦' },
  { id: 'memory', title: 'Memory Match', cat: 'Puzzle', emoji: '🧠' },
  { id: '2048', title: '2048', cat: 'Puzzle', emoji: '🔢' },
  { id: 'pong', title: 'Pong', cat: 'Classic', emoji: '🏓' },
  { id: 'breakout', title: 'Breakout', cat: 'Arcade', emoji: '🧱' },
  { id: 'tic', title: 'Tic-Tac-Toe', cat: 'Classic', emoji: '❌' },
  { id: 'connect4', title: 'Connect Four', cat: 'Classic', emoji: '🟡' },
  { id: 'hangman', title: 'Hangman', cat: 'Puzzle', emoji: '🪝' },
  { id: 'rps', title: 'Rock Paper Scissors', cat: 'Classic', emoji: '🪨' },
  { id: 'guess', title: 'Number Guess', cat: 'Puzzle', emoji: '🔍' },
  { id: 'scramble', title: 'Word Scramble', cat: 'Puzzle', emoji: '🔤', disabled: true },
  { id: 'bubble', title: 'Bubble Shooter', cat: 'Arcade', emoji: '🫧', disabled: true },
  { id: 'break', title: 'Brick Breaker', cat: 'Arcade', emoji: '🧱', disabled: true },
  { id: 'runner', title: 'Runner', cat: 'Arcade', emoji: '🏃' },
  { id: 'helix', title: 'Helix Jump', cat: 'Arcade', emoji: '🌀', disabled: true },
  { id: 'mole', title: 'Whack-a-Mole', cat: 'Arcade', emoji: '🐹' },
  { id: 'tiles', title: 'Piano Tiles', cat: 'Arcade', emoji: '🎹' },
  { id: 'balloon', title: 'Balloon Pop', cat: 'Arcade', emoji: '🎈' },
  { id: 'slide15', title: '15 Puzzle', cat: 'Puzzle', emoji: '🧩' },
  { id: 'dice', title: 'Dice Roller', cat: 'Classic', emoji: '🎲' },
  { id: 'domino', title: 'Dominoes', cat: 'Classic', emoji: '🁣' },
  { id: 'fishing', title: 'Fishing', cat: 'Arcade', emoji: '🎣' },
  { id: 'doodle', title: 'Doodle Jump', cat: 'Arcade', emoji: '🖊️' },
  { id: 'math', title: 'Math Quiz', cat: 'Puzzle', emoji: '➗' },
  { id: 'gk', title: 'GK Quiz', cat: 'Puzzle', emoji: '📚' },
  { id: 'jetpack', title: 'Jetpack Adventure', cat: 'Arcade', emoji: '🛩️', disabled: true },
  { id: 'maze', title: 'Maze Escape', cat: 'Puzzle', emoji: '🧭', disabled: true },
  { id: 'space', title: 'Space Invaders', cat: 'Arcade', emoji: '👾' },
  { id: 'gallery', title: 'Shooting Gallery', cat: 'Arcade', emoji: '🎯' },
  { id: 'tangram', title: 'Tangram', cat: 'Puzzle', emoji: '🔷' },
  { id: 'trivia', title: 'Trivia PvP', cat: 'Puzzle', emoji: '❓' },
  { id: 'platformer', title: 'Platformer Runner', cat: 'Arcade', emoji: '🏃‍♂️', disabled: true },
  { id: 'whack', title: 'Whack', cat: 'Arcade', emoji: '🔨', disabled: true },
  { id: 'scrabble', title: 'Crossword', cat: 'Puzzle', emoji: '🧠', disabled: true },
];

export function renderGames(root) {
  const section = document.createElement('section');
  section.innerHTML = `
    <div class="toolbar">
      <input id="search" type="search" placeholder="Search games" />
      <select id="filter">
        <option value="">All Categories</option>
        <option>Arcade</option>
        <option>Puzzle</option>
        <option>Classic</option>
        <option>Strategy</option>
      </select>
    </div>
    <div class="grid" id="grid"></div>
    <h3>Favorites</h3>
    <div class="grid" id="fav"></div>
    <h3>Recently Played</h3>
    <div class="grid" id="recent"></div>
  `;
  root.appendChild(section);

  const grid = section.querySelector('#grid');
  const favGrid = section.querySelector('#fav');
  const recentGrid = section.querySelector('#recent');
  const search = section.querySelector('#search');
  const filter = section.querySelector('#filter');

  function renderList() {
    const q = search.value.trim().toLowerCase();
    const f = filter.value;
    grid.innerHTML = '';
    GAMES.filter(g => (!f || g.cat === f) && (!q || g.title.toLowerCase().includes(q)))
      .forEach(g => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="thumb">${g.emoji || '🎮'}</div>
          <div class="meta">
            <h4>${g.title}</h4>
            <span class="tag">${g.cat}</span>
          </div>
          <div class="actions">
            <button class="play" ${g.disabled ? 'disabled' : ''}>Play</button>
            <button class="fav">★</button>
          </div>
        `;
        card.querySelector('.play').addEventListener('click', () => {
          gameHost.play(g);
        });
        card.querySelector('.fav').addEventListener('click', () => toggleFav(g.id));
        grid.appendChild(card);
      });
  }
  function toggleFav(id){
    const fav = storage.get('favorites', []);
    const i = fav.indexOf(id);
    if (i>=0) fav.splice(i,1); else fav.push(id);
    storage.set('favorites', fav);
    renderFav();
  }
  function renderFav(){
    const fav = storage.get('favorites', []);
    favGrid.innerHTML = '';
    fav.map(id => GAMES.find(g=>g.id===id)).filter(Boolean).forEach(g=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb">${g.emoji || '🎮'}</div>
        <div class="meta"><h4>${g.title}</h4><span class="tag">${g.cat}</span></div>
        <div class="actions"><button class="play" ${g.disabled?'disabled':''}>Play</button></div>`;
      card.querySelector('.play').addEventListener('click', ()=> gameHost.play(g));
      favGrid.appendChild(card);
    });
  }
  function renderRecent(){
    const recent = storage.get('recent', []);
    recentGrid.innerHTML = '';
    recent.map(r => GAMES.find(g=>g.id===r.id)).filter(Boolean).forEach(g=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb">${g.emoji || '🎮'}</div>
        <div class="meta"><h4>${g.title}</h4><span class="tag">${g.cat}</span></div>
        <div class="actions"><button class="play" ${g.disabled?'disabled':''}>Play</button></div>`;
      card.querySelector('.play').addEventListener('click', ()=> gameHost.play(g));
      recentGrid.appendChild(card);
    });
  }

  search.addEventListener('input', renderList);
  filter.addEventListener('change', renderList);
  renderList();
  renderFav();
  renderRecent();
}


