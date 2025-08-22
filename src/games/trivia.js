export function createGame({ mount }){
  const qs=[
    { q:'2 + 2 = ?', a:['3','4','5','6'], i:1 },
    { q:'Sky color?', a:['Green','Blue','Red','Yellow'], i:1 },
  ];
  let idx=0, p1=0, p2=0, turn=1; const el=document.createElement('div'); el.style.textAlign='center'; const q=document.createElement('h3'); const opts=document.createElement('div'); opts.style.display='grid'; opts.style.gridTemplateColumns='repeat(2, 1fr)'; opts.style.gap='6px'; const out=document.createElement('p');
  function render(){ const cur=qs[idx]; q.textContent = `(P${turn}) ${cur.q}`; opts.innerHTML=''; cur.a.forEach((t,i)=>{ const b=document.createElement('button'); b.textContent=t; b.addEventListener('click',()=>pick(i)); opts.appendChild(b); }); out.textContent=`P1: ${p1} | P2: ${p2}`; }
  function pick(i){ const cur=qs[idx]; if(i===cur.i){ if(turn===1) p1++; else p2++; } idx++; turn = 3 - turn; if(idx>=qs.length){ q.textContent='Done!'; opts.innerHTML=''; out.textContent=`P1: ${p1} | P2: ${p2}`; } else render(); }
  el.append(q,opts,out); mount.appendChild(el); render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


