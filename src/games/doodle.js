export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=400; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let player={ x:200, y:500, vy:-10 }; let platforms=[]; let score=0; let paused=false;
  for(let i=0;i<10;i++) platforms.push({ x:Math.random()*340, y:i*60, w:60, h:10 });
  canvas.addEventListener('pointermove',(e)=>{ const r=canvas.getBoundingClientRect(); player.x = e.clientX-r.left; });
  function step(){ if(paused) return; player.y += player.vy; player.vy += 0.3; if(player.y>600){ reset(); }
    for(const p of platforms){ if(player.y+10>p.y && player.y+10<p.y+10 && player.x>p.x && player.x<p.x+p.w && player.vy>0){ player.vy=-10; score++; }}
    if(player.y<300){ const dy=300-player.y; player.y=300; platforms.forEach(p=> p.y+=dy); }
    platforms = platforms.filter(p=> p.y<600); while(platforms.length<10){ platforms.push({ x:Math.random()*340, y: platforms[platforms.length-1].y-60, w:60, h:10 }); }
  }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,400,600); ctx.fillStyle='#fff'; ctx.fillRect(player.x-5,player.y-10,10,10); ctx.fillStyle='#22c55e'; platforms.forEach(p=>ctx.fillRect(p.x,p.y,p.w,p.h)); ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 24); }
  function loop(){ step(); draw(); requestAnimationFrame(loop); } loop();
  function reset(){ player={ x:200, y:500, vy:-10 }; platforms=[]; for(let i=0;i<10;i++) platforms.push({ x:Math.random()*340, y:i*60, w:60, h:10 }); score=0; }
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ mount.innerHTML=''; } };
}


