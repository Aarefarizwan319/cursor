export function createGame({ mount }){
  const el=document.createElement('div'); el.style.display='grid'; el.style.placeItems='center'; el.style.height='100%';
  const board=document.createElement('div'); board.style.display='grid'; board.style.gridTemplateColumns='repeat(3, 120px)'; board.style.gap='8px';
  const info=document.createElement('div'); info.style.marginBottom='8px'; el.appendChild(info); el.appendChild(board); mount.appendChild(el);
  let grid=Array(9).fill(null); let player='X'; let vsAI=true; let over=false;
  const cells = Array.from({length:9},()=>{ const c=document.createElement('button'); c.style.height='120px'; c.style.fontSize='40px'; c.style.borderRadius='10px'; board.appendChild(c); return c; });
  function lines(){ return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; }
  function winner(){ for(const [a,b,c] of lines()) if(grid[a]&&grid[a]===grid[b]&&grid[b]===grid[c]) return grid[a]; if(grid.every(Boolean)) return 'D'; return null; }
  function render(){ info.textContent = over? (over==='D'?'Draw':'Winner: '+over): 'Turn: '+player; cells.forEach((c,i)=>{ c.textContent=grid[i]||''; c.disabled=!!grid[i]||over; }); }
  function move(i){ if(grid[i]||over) return; grid[i]=player; const w=winner(); if(w){ over=w; render(); return; } player = player==='X'?'O':'X'; render(); if(vsAI && player==='O') setTimeout(ai,120); }
  function ai(){ // simple minimax depth-limited
    const i = bestMove(grid,'O'); move(i); }
  function bestMove(g,me){ let best=-1, bestScore=-Infinity; for(let i=0;i<9;i++){ if(!g[i]){ g[i]=me; const s = minimax(g, false, me); g[i]=null; if(s>bestScore){ bestScore=s; best=i; } } } return best; }
  function minimax(g, isMax, me){ const w = evalBoard(g, me); if(w!==null) return w; let best = isMax? -Infinity: Infinity; for(let i=0;i<9;i++){ if(!g[i]){ g[i]= isMax? me : (me==='X'?'O':'X'); const s = minimax(g, !isMax, me); g[i]=null; best = isMax? Math.max(best,s) : Math.min(best,s); } } return best; }
  function evalBoard(g, me){ for(const [a,b,c] of lines()){ if(g[a]&&g[a]===g[b]&&g[b]===g[c]) return g[a]===me? 10:-10; } if(g.every(Boolean)) return 0; return null; }
  cells.forEach((c,i)=> c.addEventListener('click', ()=>move(i)) );
  render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


