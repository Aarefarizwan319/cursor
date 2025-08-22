export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=400; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let rows=[]; let speed=3; let score=0; let paused=false; let alive=true;
  function addRow(){ const idx=Math.floor(Math.random()*4); rows.unshift(idx); if(rows.length>10) rows.pop(); }
  for(let i=0;i<10;i++) addRow();
  function tap(x,y){ if(!alive){ reset(); return; } const c=Math.floor(x/(canvas.width/4)); const r=rows.length-1; if(rows[r]===c){ rows.pop(); addRow(); score++; speed=Math.min(10, speed+0.05); } else { alive=false; } }
  canvas.addEventListener('pointerdown', (e)=>{ const rect=canvas.getBoundingClientRect(); tap(e.clientX-rect.left, e.clientY-rect.top); });
  function step(){ if(paused||!alive) return; }
  function draw(){ ctx.fillStyle='#111'; ctx.fillRect(0,0,400,600); const w=canvas.width/4; for(let i=0;i<rows.length;i++){ const c=rows[i]; ctx.fillStyle='#444'; for(let j=0;j<4;j++) ctx.fillRect(j*w, i*60, w-2, 58); ctx.fillStyle='#fff'; ctx.fillRect(c*w, i*60, w-2, 58); }
    ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); if(!alive) ctx.fillText('Tap to restart', 12, 48); }
  function loop(){ step(); draw(); requestAnimationFrame(loop); } loop();
  function reset(){ rows=[]; for(let i=0;i<10;i++) addRow(); alive=true; score=0; speed=3; }
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


