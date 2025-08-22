export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let y=300, vy=0; const g=0.5; let pipes=[]; let t=0; let score=0; let alive=true; let paused=false;
  function spawn(){ const gap=180; const min=80; const top=min+Math.random()*(canvas.height-gap-2*min); pipes.push({ x:900, top, gap }); }
  function step(){ if(!alive||paused) return; t++; if(t%100===0) spawn(); vy+=g; y+=vy; if(y<0||y>canvas.height) alive=false; pipes.forEach(p=> p.x-=4); pipes=pipes.filter(p=> p.x>-80); for(const p of pipes){ if(450>p.x-25 && 450<p.x+50){ if(y<p.top-20 || y>p.top+p.gap+20) alive=false; } if(!p.score && p.x+50<450){ score++; p.score=true; } } }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#22c55e'; for(const p of pipes){ ctx.fillRect(p.x,0,60,p.top); ctx.fillRect(p.x,p.top+p.gap,60,600-(p.top+p.gap)); } ctx.fillStyle='#fbbf24'; ctx.fillRect(440,y-10,20,20); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  function thrust(){ if(!alive){ y=300; vy=0; pipes=[]; score=0; alive=true; return; } vy=-8; }
  canvas.addEventListener('pointerdown', thrust); window.addEventListener('keydown',(e)=>{ if(e.code==='Space'||e.key==='ArrowUp') thrust(); });
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


