import { audio } from '../core/audio.js';
import { progression } from '../core/progression.js';
import { gamepad } from '../core/input.js';

export function createGame({ mount, storage }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'game-canvas';
  canvas.width = 900; canvas.height = 600;
  mount.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Game state
  const grid = 30; // pixels per cell
  const cols = Math.floor(canvas.width / grid);
  const rows = Math.floor(canvas.height / grid);
  let snake = [{ x: Math.floor(cols/2), y: Math.floor(rows/2) }];
  let dir = { x: 1, y: 0 };
  let apple = spawnApple();
  let alive = true; let paused = false; let score = 0;
  const keyQueue = [];

  const best = storage.get('scores.snake', { best: 0, top: [] });

  function spawnApple() {
    let a;
    do {
      a = { x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows) };
    } while (snake.some(s => s.x === a.x && s.y === a.y));
    return a;
  }

  function step() {
    if (!alive || paused) return;
    const next = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    // wrap
    next.x = (next.x + cols) % cols;
    next.y = (next.y + rows) % rows;

    // collision with self
    if (snake.some(s => s.x === next.x && s.y === next.y)) {
      alive = false;
      audio.playSfx('assets/sfx/lose.mp3');
      saveScore();
      progression.addXp(20);
      return;
    }

    snake.unshift(next);
    if (next.x === apple.x && next.y === apple.y) {
      score += 10;
      audio.playSfx('assets/sfx/coin.mp3');
      if (score === 50) progression.awardBadge('snake-50','Snake 50');
      apple = spawnApple();
    } else {
      snake.pop();
    }
  }

  function saveScore() {
    const profile = storage.get('profile', { name: 'Player' });
    const data = storage.get('scores.snake', { best: 0, top: [] });
    data.best = Math.max(data.best, score);
    data.top.push({ name: profile.name || 'Player', score, t: Date.now() });
    data.top.sort((a,b)=>b.score-a.score);
    data.top = data.top.slice(0,5);
    storage.set('scores.snake', data);
  }

  // Input
  function setDir(nx, ny) {
    // prevent reverse on same axis
    if (snake.length > 1 && (nx === -dir.x && ny === -dir.y)) return;
    dir = { x: nx, y: ny };
  }
  function handleKey(e) {
    const k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') setDir(0,-1);
    if (k === 'arrowdown' || k === 's') setDir(0,1);
    if (k === 'arrowleft' || k === 'a') setDir(-1,0);
    if (k === 'arrowright' || k === 'd') setDir(1,0);
  }
  window.addEventListener('keydown', handleKey);
  gamepad.init();
  gamepad.onTick((pads)=>{
    const p = pads[0];
    if (!p) return;
    const axX = p.axes[0]||0, axY = p.axes[1]||0;
    if (axY < -0.5) setDir(0,-1);
    else if (axY > 0.5) setDir(0,1);
    else if (axX < -0.5) setDir(-1,0);
    else if (axX > 0.5) setDir(1,0);
  });

  // Touch onscreen controls
  const controls = document.createElement('div');
  controls.className = 'onscreen-controls';
  controls.innerHTML = `
    <button data-d="up">▲</button>
    <button class="empty"></button>
    <button data-d="right">▶</button>
    <button data-d="left">◀</button>
    <button data-d="down">▼</button>
  `;
  mount.appendChild(controls);
  controls.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.getAttribute('data-d');
    if (d === 'up') setDir(0,-1);
    if (d === 'down') setDir(0,1);
    if (d === 'left') setDir(-1,0);
    if (d === 'right') setDir(1,0);
  });

  // Render
  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    // apple
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(apple.x*grid, apple.y*grid, grid, grid);

    // snake
    ctx.fillStyle = '#22c55e';
    for (const s of snake) {
      ctx.fillRect(s.x*grid, s.y*grid, grid-1, grid-1);
    }

    // score
    ctx.fillStyle = '#fff';
    ctx.font = '16px system-ui';
    ctx.fillText(`Score: ${score}  Best: ${best.best}`, 12, 22);
  }

  let last = 0; const interval = 120; // ms
  function loop(ts) {
    if (!alive) return draw(), requestAnimationFrame(loop);
    if (!paused && ts - last > interval) { last = ts; step(); }
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  return {
    pause() { paused = true; },
    resume() { paused = false; },
    destroy() { window.removeEventListener('keydown', handleKey); mount.innerHTML = ''; },
  };
}


