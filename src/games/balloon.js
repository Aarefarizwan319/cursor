export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let balloons=[]; let score=0; let paused=false;
  function spawn(){ balloons.push({ x:Math.random()*900, y:600+40, r:20+Math.random()*20, v:1+Math.random()*2 }); }
  setInterval(()=>{ if(!paused) spawn(); }, 500);
  canvas.addEventListener('pointerdown', (e)=>{ const rect=canvas.getBoundingClientRect(); const x=e.clientX-rect.left, y=e.clientY-rect.top; for(const b of balloons){ const d=Math.hypot(b.x-x,b.y-y); if(d<b.r){ b.pop=true; score++; } } });
  function step(){ balloons.forEach(b=> b.y-=b.v); balloons=balloons.filter(b=>!b.pop && b.y>-50); }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); for(const b of balloons){ ctx.fillStyle='#f43f5e'; ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill(); } }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


