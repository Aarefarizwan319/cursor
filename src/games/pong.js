export function createGame({ mount }){
  const canvas = document.createElement('canvas');
  canvas.className = 'game-canvas'; canvas.width=900; canvas.height=600; mount.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let ball = { x:450, y:300, vx:4, vy:3, r:10 };
  let p1 = { y:260, h:80 }, p2 = { y:260, h:80 };
  let s1=0, s2=0; let paused=false;

  function step(){ if(paused) return; ball.x+=ball.vx; ball.y+=ball.vy; if(ball.y<ball.r||ball.y>canvas.height-ball.r) ball.vy*=-1;
    // AI follows ball
    p2.y += Math.sign(ball.y - (p2.y+p2.h/2)) * 4;
    // paddle collisions
    if(ball.x<30 && ball.y>p1.y && ball.y<p1.y+p1.h){ ball.vx=Math.abs(ball.vx); }
    if(ball.x>canvas.width-30 && ball.y>p2.y && ball.y<p2.y+p2.h){ ball.vx=-Math.abs(ball.vx); }
    if(ball.x<0){ s2++; reset(); } if(ball.x>canvas.width){ s1++; reset(); }
  }
  function reset(){ ball={ x:450,y:300,vx:4*Math.sign(Math.random()-0.5),vy:3,r:10 }; }
  function draw(){ ctx.fillStyle='#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#fff'; ctx.fillRect(10,p1.y,10,p1.h); ctx.fillRect(canvas.width-20,p2.y,10,p2.h);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fill(); ctx.fillText(`${s1} : ${s2}`, 430, 30);
  }
  function loop(){ step(); draw(); requestAnimationFrame(loop); } loop();
  function onKey(e){ const k=e.key.toLowerCase(); if(k==='arrowup'||k==='w') p1.y-=12; if(k==='arrowdown'||k==='s') p1.y+=12; }
  window.addEventListener('keydown', onKey);
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ window.removeEventListener('keydown', onKey); mount.innerHTML=''; } };
}


