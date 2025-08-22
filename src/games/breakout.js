export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let paddle={ x:400, y:560, w:120, h:14 };
  let ball={ x:450, y:540, vx:4, vy:-4, r:8 };
  const rows=5, cols=10, bricks=[]; let remaining=rows*cols; let paused=false; let score=0;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) bricks.push({ x: c*88+20, y: r*24+40, w:80, h:18, alive:true });

  function step(){ if(paused) return; ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.x<ball.r||ball.x>canvas.width-ball.r) ball.vx*=-1; if(ball.y<ball.r) ball.vy*=-1; if(ball.y>canvas.height){ reset(); }
    // paddle
    if(ball.y>paddle.y-ball.r && ball.x>paddle.x && ball.x<paddle.x+paddle.w){ ball.vy*=-1; ball.y=paddle.y-ball.r; }
    // bricks
    for(const b of bricks){ if(!b.alive) continue; if(ball.x>b.x && ball.x<b.x+b.w && ball.y>b.y && ball.y<b.y+b.h){ b.alive=false; remaining--; score+=10; ball.vy*=-1; break; } }
  }
  function reset(){ ball={ x:450,y:540,vx:4,vy:-4,r:8 }; paddle.x=400; }
  function draw(){ ctx.fillStyle='#000'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle='#fff'; ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fill();
    for(const b of bricks){ if(!b.alive) continue; ctx.fillStyle='#7c5cff'; ctx.fillRect(b.x,b.y,b.w,b.h); }
    ctx.fillStyle='#fff'; ctx.fillText(`Score: ${score}`, 12, 22);
  }
  function loop(){ step(); draw(); requestAnimationFrame(loop); } loop();
  let dragging=false, px=0; canvas.addEventListener('pointerdown',(e)=>{ dragging=true; px=e.clientX; }); canvas.addEventListener('pointerup',()=>dragging=false); canvas.addEventListener('pointermove',(e)=>{ if(dragging){ const dx=e.clientX-px; px=e.clientX; paddle.x = Math.max(0, Math.min(canvas.width-paddle.w, paddle.x+dx)); }});
  function onKey(e){ if(e.key==='ArrowLeft') paddle.x-=20; if(e.key==='ArrowRight') paddle.x+=20; }
  window.addEventListener('keydown', onKey);
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ window.removeEventListener('keydown', onKey); mount.innerHTML=''; } };
}


