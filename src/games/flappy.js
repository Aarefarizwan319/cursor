export function createGame({ mount, haptics }){
  const canvas = document.createElement('canvas');
  canvas.className = 'game-canvas';
  canvas.width = 900; canvas.height = 600;
  mount.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let bird = { x: 200, y: 300, vy: 0 };
  const g = 0.5; const flap = -8;
  let pipes = [];
  let tick = 0; let score = 0; let alive = true; let paused = false;

  function spawnPipe(){
    const gap = 160; const min = 80; const max = canvas.height - gap - min;
    const top = Math.floor(Math.random()*max)+min;
    pipes.push({ x: canvas.width+40, top, gap });
  }

  function step(){
    if (!alive || paused) return;
    tick++;
    bird.vy += g; bird.y += bird.vy;
    if (tick % 90 === 0) spawnPipe();
    pipes.forEach(p=> p.x -= 3);
    pipes = pipes.filter(p=> p.x > -80);

    // collision
    if (bird.y < 0 || bird.y > canvas.height) { die(); }
    for (const p of pipes){
      const bx = bird.x, by = bird.y;
      if (bx > p.x-25 && bx < p.x+50){
        if (by < p.top-20 || by > p.top+p.gap+20) die();
      }
      if (!p.scored && p.x+50 < bird.x){ score++; p.scored = true; }
    }
  }
  function die(){ alive = false; try{ haptics?.([100]); }catch{} }

  function draw(){
    ctx.fillStyle = '#0a0f1a'; ctx.fillRect(0,0,canvas.width,canvas.height);
    // pipes
    ctx.fillStyle = '#22c55e';
    for (const p of pipes){
      ctx.fillRect(p.x, 0, 60, p.top);
      ctx.fillRect(p.x, p.top + p.gap, 60, canvas.height - (p.top + p.gap));
    }
    // bird
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(bird.x, bird.y, 16, 0, Math.PI*2); ctx.fill();
    // score
    ctx.fillStyle = '#fff'; ctx.font = '20px system-ui'; ctx.fillText(`Score: ${score}`, 12, 24);
    if (!alive){ ctx.fillText('Tap/Click to restart', 12, 50); }
  }

  function loop(){ if (!paused) step(); draw(); requestAnimationFrame(loop); }
  loop();

  function flapUp(){ if (!alive){ reset(); return; } bird.vy = flap; }
  function reset(){ bird = { x:200,y:300,vy:0 }; pipes=[]; tick=0; score=0; alive=true; }

  canvas.addEventListener('pointerdown', flapUp);
  window.addEventListener('keydown', (e)=>{ if (e.code==='Space' || e.key==='ArrowUp') flapUp(); });

  return { pause(){ paused=true; }, resume(){ paused=false; }, destroy(){ mount.innerHTML=''; } };
}

// Stub for future implementation
export function createGame({ mount }){
  const d = document.createElement('div');
  d.style.color = 'white';
  d.textContent = 'Flappy Bird coming soon';
  mount.appendChild(d);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


