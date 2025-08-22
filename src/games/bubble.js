export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=800; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let shots=[]; let bubbles=[]; let score=0; let paused=false;
  function spawn(){ bubbles.push({ x:Math.random()*760+20, y:-20, r:16, v:1+Math.random()*1.5 }); }
  setInterval(()=>{ if(!paused) spawn(); }, 700);
  canvas.addEventListener('pointerdown',(e)=>{ const r=canvas.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; shots.push({ x:canvas.width/2, y:canvas.height-20, vx:(x-canvas.width/2)/30, vy:(y-(canvas.height-20))/30 }); });
  function step(){ shots.forEach(s=>{ s.x+=s.vx; s.y+=s.vy; }); shots=shots.filter(s=> s.x>-20&&s.x<820&&s.y>-20&&s.y<620); bubbles.forEach(b=> b.y+=b.v); bubbles=bubbles.filter(b=> b.y<620); for(const s of shots){ for(const b of bubbles){ if(Math.hypot(b.x-s.x,b.y-s.y)<b.r){ b.pop=true; s.dead=true; score++; } } } shots=shots.filter(s=>!s.dead); bubbles=bubbles.filter(b=>!b.pop); }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,800,600); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); ctx.fillStyle='#22c55e'; bubbles.forEach(b=>{ ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill(); }); ctx.fillStyle='#0ea5e9'; shots.forEach(s=>{ ctx.beginPath(); ctx.arc(s.x,s.y,4,0,Math.PI*2); ctx.fill(); }); ctx.fillStyle='#fff'; ctx.fillRect(canvas.width/2-20, canvas.height-14, 40, 8); }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


