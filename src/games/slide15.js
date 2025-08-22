export function createGame({ mount }){
  const el=document.createElement('div'); el.style.display='grid'; el.style.placeItems='center'; el.style.height='100%';
  const grid=document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(4, 80px)'; grid.style.gap='8px'; el.appendChild(grid); mount.appendChild(el);
  let tiles=[...Array(15).keys()].map(x=>x+1); tiles.push(0);
  function shuffle(){ for(let i=0;i<1000;i++) move([0,1,2,3][Math.floor(Math.random()*4)]); }
  function render(){ grid.innerHTML=''; tiles.forEach((v,i)=>{ const b=document.createElement('button'); b.style.height='80px'; b.style.borderRadius='8px'; b.textContent=v||''; b.disabled=!v; b.addEventListener('click',()=>click(i)); grid.appendChild(b); }); }
  function indexOfZero(){ return tiles.indexOf(0); }
  function pos(i){ return [Math.floor(i/4), i%4]; }
  function click(i){ const z=indexOfZero(); const [rz,cz]=pos(z); const [ri,ci]=pos(i); if((rz===ri && Math.abs(ci-cz)===1) || (cz===ci && Math.abs(ri-rz)===1)){ [tiles[z],tiles[i]]=[tiles[i],tiles[z]]; render(); }
  }
  function move(dir){ const z=indexOfZero(); const [r,c]=pos(z); const delta={0:[-1,0],1:[1,0],2:[0,-1],3:[0,1]}[dir]; const nr=r+delta[0], nc=c+delta[1]; if(nr<0||nr>3||nc<0||nc>3) return; const i=nr*4+nc; [tiles[z],tiles[i]]=[tiles[i],tiles[z]]; }
  shuffle(); render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


