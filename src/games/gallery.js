export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d'); let targets=[]; let score=0; let paused=false;
  function spawn(){ targets.push({ x:50+Math.random()*800, y:50+Math.random()*500, r:16, t:60 }); }
  setInterval(()=>{ if(!paused) spawn(); }, 700);
  canvas.addEventListener('pointerdown',(e)=>{ const r=canvas.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; for(const t of targets){ if(Math.hypot(t.x-x,t.y-y)<t.r){ t.hit=true; score++; } } });
  function step(){ targets.forEach(t=> t.t--); targets=targets.filter(t=>!t.hit && t.t>0); }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); ctx.fillStyle='#fbbf24'; targets.forEach(t=>{ ctx.beginPath(); ctx.arc(t.x,t.y,t.r,0,Math.PI*2); ctx.fill(); }); }
  function loop(){ if(!paused) step(); draw(); requestAnimationFrame(loop); } loop();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


