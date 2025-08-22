export function createGame({ mount }){
  const canvas=document.createElement('canvas'); canvas.className='game-canvas'; canvas.width=600; canvas.height=600; mount.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  const n=15, cell=40; const maze=gen(n); let px=0, py=0; let paused=false;
  function gen(n){ const visited=Array.from({length:n},()=>Array(n).fill(false)); const walls={ h:Array.from({length:n+1},()=>Array(n).fill(true)), v:Array.from({length:n},()=>Array(n+1).fill(true))}; function dfs(r,c){ visited[r][c]=true; const dirs=[[1,0],[0,1],[-1,0],[0,-1]].sort(()=>Math.random()-0.5); for(const [dr,dc] of dirs){ const nr=r+dr,nc=c+dc; if(nr<0||nr>=n||nc<0||nc>=n||visited[nr][nc]) continue; if(dr===1) walls.h[r+1][c]=false; if(dr===-1) walls.h[r][c]=false; if(dc===1) walls.v[r][c+1]=false; if(dc===-1) walls.v[r][c]=false; dfs(nr,nc); } } dfs(0,0); return walls; }
  function draw(){ ctx.fillStyle='#0a0f1a'; ctx.fillRect(0,0,600,600); ctx.strokeStyle='#7c5cff'; ctx.lineWidth=2; for(let r=0;r<=n;r++) for(let c=0;c<n;c++){ if(maze.h[r][c]){ ctx.beginPath(); ctx.moveTo(c*cell, r*cell); ctx.lineTo((c+1)*cell, r*cell); ctx.stroke(); }} for(let r=0;r<n;r++) for(let c=0;c<=n;c++){ if(maze.v[r][c]){ ctx.beginPath(); ctx.moveTo(c*cell, r*cell); ctx.lineTo(c*cell, (r+1)*cell); ctx.stroke(); }} ctx.fillStyle='#22c55e'; ctx.fillRect(px*cell+10, py*cell+10, cell-20, cell-20); ctx.fillStyle='#fbbf24'; ctx.fillRect((n-1)*cell+12, (n-1)*cell+12, cell-24, cell-24); }
  function canMove(dx,dy){ const nx=px+dx, ny=py+dy; if(nx<0||nx>=n||ny<0||ny>=n) return false; if(dx===1 && maze.v[py][px+1]) return false; if(dx===-1 && maze.v[py][px]) return false; if(dy===1 && maze.h[py+1][px]) return false; if(dy===-1 && maze.h[py][px]) return false; return true; }
  function onKey(e){ const k=e.key.toLowerCase(); if(k==='arrowright'||k==='d'){ if(canMove(1,0)) px++; } if(k==='arrowleft'||k==='a'){ if(canMove(-1,0)) px--; } if(k==='arrowdown'||k==='s'){ if(canMove(0,1)) py++; } if(k==='arrowup'||k==='w'){ if(canMove(0,-1)) py--; } draw(); }
  window.addEventListener('keydown', onKey); draw();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ window.removeEventListener('keydown', onKey); mount.innerHTML=''; } };
}


