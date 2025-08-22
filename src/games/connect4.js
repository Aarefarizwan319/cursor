export function createGame({ mount }){
  const el=document.createElement('div'); el.style.display='grid'; el.style.placeItems='center'; el.style.height='100%';
  const board=document.createElement('div'); board.style.display='grid'; board.style.gridTemplateColumns='repeat(7, 70px)'; board.style.gap='6px';
  const info=document.createElement('div'); info.style.marginBottom='8px'; el.appendChild(info); el.appendChild(board); mount.appendChild(el);
  let g=Array.from({length:6},()=>Array(7).fill(0)); let player=1; let over=0;
  function render(){ info.textContent = over? `Winner: ${over===1?'Red':'Yellow'}`: `Turn: ${player===1?'Red':'Yellow'}`; board.innerHTML='';
    for(let r=0;r<6;r++) for(let c=0;c<7;c++){ const b=document.createElement('button'); b.style.width='70px'; b.style.height='70px'; b.style.borderRadius='50%'; b.style.background=g[r][c]===0?'#1b2130':g[r][c]===1?'#ef4444':'#f59e0b'; b.disabled=!!over; b.addEventListener('click', ()=>drop(c)); board.appendChild(b); }
  }
  function drop(c){ for(let r=5;r>=0;r--){ if(g[r][c]===0){ g[r][c]=player; const w=win(); if(w){ over=w; render(); return; } player = 3-player; render(); return; } } }
  function win(){ const dirs=[[1,0],[0,1],[1,1],[1,-1]]; for(let r=0;r<6;r++) for(let c=0;c<7;c++){ const p=g[r][c]; if(!p) continue; for(const [dr,dc] of dirs){ let k=1; for(;k<4;k++){ const rr=r+dr*k, cc=c+dc*k; if(rr<0||rr>=6||cc<0||cc>=7||g[rr][cc]!==p) break; } if(k===4) return p; }} return 0; }
  render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


