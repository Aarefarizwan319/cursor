export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let player={ x:120, y:520, vy:0, on:true }; let g=0.8; let obstacles=[]; let t=0; let score=0; let alive=true; let paused=false;
  function spawn(){ const h=40+Math.random()*80; obstacles.push({ x:900, y:600-h, w:30+Math.random()*40, h }); }
  function step(){ if(!alive||paused) return; t++; if(t%90===0) spawn(); player.vy+=g; player.y+=player.vy; if(player.y>520){ player.y=520; player.vy=0; player.on=true; }
    obstacles.forEach(o=> o.x-=6); obstacles=obstacles.filter(o=>o.x+o.w>0);
    for(const o of obstacles){ if(player.x<o.x+o.w && player.x+30>o.x && player.y+60>o.y){ alive=false; } }
    if(alive) score++; }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#4ade80'; ctx.fillRect(0,580,900,20);
    ctx.fillStyle='#fff'; ctx.fillRect(player.x, player.y, 30, 60); ctx.fillStyle='#7c5cff'; obstacles.forEach(o=>ctx.fillRect(o.x,o.y,o.w,o.h));
    ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); if(!alive) ctx.fillText('Tap/Space to restart', 12, 48);
  }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  function jump(){ if(!alive){ reset(); return; } if(player.on){ player.vy=-16; player.on=false; } }
  function reset(){ player={ x:120,y:520,vy:0,on:true }; obstacles=[]; t=0; score=0; alive=true; }
  canvas.addEventListener('pointerdown', jump); window.addEventListener('keydown', (e)=>{ if(e.code==='Space'||e.key==='ArrowUp') jump(); });
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


