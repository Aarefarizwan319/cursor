export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let hook={ x:450, y:50 }; let fish=[]; let score=0; let paused=false;
  function spawn(){ fish.push({ x:Math.random()*900, y:200+Math.random()*350, v:(Math.random()<0.5?-1:1)*(1+Math.random()*2) }); }
  setInterval(()=>{ if(!paused) spawn(); }, 800);
  canvas.addEventListener('pointermove', (e)=>{ const rect=canvas.getBoundingClientRect(); hook.x = e.clientX-rect.left; });
  canvas.addEventListener('pointerdown', ()=>{ for(const f of fish){ if(Math.abs(f.x-hook.x)<20 && Math.abs(f.y-hook.y)<20){ f.caught=true; score++; } } });
  function step(){ fish.forEach(f=>{ f.x+=f.v; if(f.x<0||f.x>900) f.v*=-1; }); fish=fish.filter(f=>!f.caught); }
  function draw(){ ctx.fillStyle='#0ea5e9'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#fff'; ctx.fillRect(hook.x-2, 0, 4, hook.y); ctx.fillRect(hook.x-6, hook.y, 12, 12); ctx.fillStyle='#fbbf24'; fish.forEach(f=>{ ctx.beginPath(); ctx.arc(f.x,f.y,10,0,Math.PI*2); ctx.fill(); }); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


