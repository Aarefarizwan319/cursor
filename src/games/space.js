export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let ship={ x:450, y:520 }; let bullets=[]; let inv=[]; let dir=1; let paused=false; let score=0;
  for(let r=0;r<4;r++) for(let c=0;c<10;c++) inv.push({ x:120+c*60, y:60+r*40, alive:true });
  function step(){ if(paused) return; inv.forEach(i=> i.x+=dir*1.5); const xs=inv.map(i=>i.x); if(Math.max(...xs)>820||Math.min(...xs)<80) dir*=-1, inv.forEach(i=> i.y+=20); bullets.forEach(b=> b.y-=6); bullets=bullets.filter(b=> b.y>0); for(const b of bullets){ for(const i of inv){ if(i.alive && Math.abs(i.x-b.x)<20 && Math.abs(i.y-b.y)<20){ i.alive=false; b.dead=true; score+=10; } } } bullets=bullets.filter(b=>!b.dead); }
  function draw(){ ctx.fillStyle='#000'; ctx.fillRect(0,0,900,600); ctx.fillStyle='#fff'; ctx.fillRect(ship.x-10,ship.y,20,20); ctx.fillStyle='#f43f5e'; inv.forEach(i=>{ if(i.alive) ctx.fillRect(i.x-15,i.y-10,30,20); }); ctx.fillStyle='#0ea5e9'; bullets.forEach(b=> ctx.fillRect(b.x-2,b.y-8,4,8)); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); }
  function loop(){ step(); draw(); requestAnimationFrame(loop); } loop();
  canvas.addEventListener('pointermove',(e)=>{ const r=canvas.getBoundingClientRect(); ship.x = e.clientX-r.left; });
  window.addEventListener('keydown',(e)=>{ if(e.code==='Space') bullets.push({ x:ship.x, y:ship.y }); });
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


