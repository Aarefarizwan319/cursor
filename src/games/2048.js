export function createGame({ mount, haptics }){
  const el = document.createElement('div');
  el.style.display = 'grid';
  el.style.placeItems = 'center';
  el.style.height = '100%';
  const boardEl = document.createElement('div');
  boardEl.style.display = 'grid';
  boardEl.style.gridTemplateColumns = 'repeat(4, 90px)';
  boardEl.style.gridGap = '8px';
  const wrap = document.createElement('div');
  wrap.style.textAlign = 'center';
  const scoreEl = document.createElement('div');
  scoreEl.style.marginBottom = '8px';
  wrap.appendChild(scoreEl);
  wrap.appendChild(boardEl);
  el.appendChild(wrap);
  mount.appendChild(el);

  let grid = Array.from({length:4},()=>Array(4).fill(0));
  let score = 0; let paused = false;

  function updateScore(){ scoreEl.textContent = `Score: ${score}`; }
  function rndEmpty(){ const e=[]; for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(!grid[r][c]) e.push([r,c]); return e[Math.floor(Math.random()*e.length)]; }
  function spawn(){ const p=rndEmpty(); if (!p) return; grid[p[0]][p[1]] = Math.random()<0.9?2:4; }
  function reset(){ grid=Array.from({length:4},()=>Array(4).fill(0)); score=0; spawn(); spawn(); render(); }

  function compress(row){ const a=row.filter(v=>v); while(a.length<4) a.push(0); return a; }
  function reverse(row){ return row.slice().reverse(); }
  function moveLeft(){
    let moved=false; for(let r=0;r<4;r++){
      let row = compress(grid[r]);
      for(let c=0;c<3;c++) if(row[c] && row[c]===row[c+1]){ row[c]*=2; score+=row[c]; row[c+1]=0; c++; }
      row = compress(row); if(row.some((v,i)=>v!==grid[r][i])) moved=true; grid[r]=row;
    } if(moved){ spawn(); render(); try{ haptics?.([10]); }catch{} }
  }
  function moveRight(){ grid = grid.map(reverse); moveLeft(); grid = grid.map(reverse); render(); }
  function moveUp(){ grid = rotateLeft(grid); moveLeft(); grid = rotateRight(grid); render(); }
  function moveDown(){ grid = rotateRight(grid); moveLeft(); grid = rotateLeft(grid); render(); }
  function rotateLeft(m){ return m[0].map((_,i)=>m.map(row=>row[i])).reverse(); }
  function rotateRight(m){ return rotateLeft(rotateLeft(rotateLeft(m))); }

  function isGameOver(){
    for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(!grid[r][c]) return false;
    for(let r=0;r<4;r++) for(let c=0;c<3;c++) if(grid[r][c]===grid[r][c+1]) return false;
    for(let c=0;c<4;c++) for(let r=0;r<3;r++) if(grid[r][c]===grid[r+1][c]) return false;
    return true;
  }

  function render(){
    updateScore();
    boardEl.innerHTML='';
    for(let r=0;r<4;r++) for(let c=0;c<4;c++){
      const cell=document.createElement('div');
      cell.style.width='90px'; cell.style.height='90px'; cell.style.display='grid'; cell.style.placeItems='center';
      cell.style.borderRadius='8px'; cell.style.background=grid[r][c]? '#2b3246':'#1b2130'; cell.style.color='white'; cell.style.fontSize='22px';
      cell.textContent = grid[r][c]||''; boardEl.appendChild(cell);
    }
    if (isGameOver()) { const o=document.createElement('div'); o.style.marginTop='8px'; o.textContent='Game Over!'; wrap.appendChild(o); }
  }

  function onKey(e){ if(paused) return; const k=e.key.toLowerCase(); if(k==='arrowleft' || k==='a') moveLeft(); else if(k==='arrowright'||k==='d') moveRight(); else if(k==='arrowup'||k==='w') moveUp(); else if(k==='arrowdown'||k==='s') moveDown(); }
  window.addEventListener('keydown', onKey);

  // touch swipe
  let sx=0, sy=0; boardEl.addEventListener('touchstart', (e)=>{ const t=e.touches[0]; sx=t.clientX; sy=t.clientY; }, {passive:true});
  boardEl.addEventListener('touchend', (e)=>{ const t=e.changedTouches[0]; const dx=t.clientX-sx, dy=t.clientY-sy; if(Math.abs(dx)>Math.abs(dy)){ if(dx>30) moveRight(); else if(dx<-30) moveLeft(); } else { if(dy>30) moveDown(); else if(dy<-30) moveUp(); } });

  reset();
  return { pause(){paused=true;}, resume(){paused=false;}, destroy(){ window.removeEventListener('keydown', onKey); mount.innerHTML=''; } };
}


