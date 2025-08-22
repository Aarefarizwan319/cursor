import { gameHost } from '../core/gameHost.js';

const CATALOG = [
  { id: 'snake', title: 'Snake' },
  { id: 'flappy', title: 'Flappy Bird', disabled: true },
  { id: '2048', title: '2048', disabled: true },
  { id: 'pong', title: 'Pong', disabled: true },
  { id: 'breakout', title: 'Breakout', disabled: true },
  { id: 'tic', title: 'Tic-Tac-Toe', disabled: true },
];

function randomGames(n){
  const enabled = CATALOG.filter(g=>!g.disabled);
  const out = [];
  for(let i=0;i<n;i++) out.push(enabled[Math.floor(Math.random()*enabled.length)]);
  return out;
}

export function renderModes(root){
  const el = document.createElement('section');
  el.innerHTML = `
    <h2>Modes</h2>
    <div class="toolbar">
      <button id="daily">Daily Challenge</button>
      <button id="random">I'm Feeling Lucky 🎲</button>
      <button id="tournament">Tournament (3 Games)</button>
    </div>
  `;
  root.appendChild(el);
  el.querySelector('#daily').addEventListener('click', () => {
    const seed = new Date().toDateString();
    const rng = Math.abs(hash(seed));
    const enabled = CATALOG.filter(g=>!g.disabled);
    const pick = enabled[rng % enabled.length];
    gameHost.play(pick);
  });
  el.querySelector('#random').addEventListener('click', () => {
    const enabled = CATALOG.filter(g=>!g.disabled);
    const pick = enabled[Math.floor(Math.random()*enabled.length)];
    gameHost.play(pick);
  });
  el.querySelector('#tournament').addEventListener('click', () => {
    const games = randomGames(3);
    gameHost.startTournament(games);
  });
}

function hash(str){
  let h = 0; for (let i=0;i<str.length;i++){ h = (h<<5) - h + str.charCodeAt(i); h|=0; }
  return h;
}


