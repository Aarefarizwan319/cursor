export function createGame({ mount }){
  const el=document.createElement('div'); el.style.display='grid'; el.style.gridTemplateColumns='repeat(3, 140px)'; el.style.gap='8px'; el.style.placeItems='center'; el.style.height='100%'; el.style.alignContent='center';
  let score=0; let active=-1; let paused=false; let timer;
  const scoreEl=document.createElement('div'); scoreEl.style.gridColumn='span 3'; scoreEl.textContent='Score: 0'; el.appendChild(scoreEl);
  const holes = Array.from({length:9},(_,i)=>{ const b=document.createElement('button'); b.style.height='120px'; b.textContent='🕳️'; b.addEventListener('click',()=>{ if(i===active){ score++; scoreEl.textContent='Score: '+score; active=-1; } }); el.appendChild(b); return b; });
  function tick(){ if(paused) return; active = Math.floor(Math.random()*9); holes.forEach((b,i)=> b.textContent = i===active? '🐹':'🕳️'); }
  timer=setInterval(tick, 800);
  mount.appendChild(el);
  return { pause(){ paused=true; }, resume(){ paused=false; }, destroy(){ clearInterval(timer); mount.innerHTML=''; } };
}


