export function createGame({ mount }){
  const qs=[
    { q:'Capital of France?', a:['Paris','Rome','Berlin','Madrid'], i:0 },
    { q:'Largest planet?', a:['Earth','Jupiter','Mars','Venus'], i:1 },
    { q:'H2O is?', a:['Salt','Water','Oxygen','Hydrogen'], i:1 },
  ];
  let idx=0, score=0; const el=document.createElement('div'); el.style.textAlign='center'; const q=document.createElement('h3'); const opts=document.createElement('div'); opts.style.display='grid'; opts.style.gridTemplateColumns='repeat(2, 1fr)'; opts.style.gap='6px'; const out=document.createElement('p');
  function render(){ const cur=qs[idx]; q.textContent=cur.q; opts.innerHTML=''; cur.a.forEach((t,i)=>{ const b=document.createElement('button'); b.textContent=t; b.addEventListener('click',()=>pick(i)); opts.appendChild(b); }); out.textContent=`Score: ${score}/${qs.length}`; }
  function pick(i){ const cur=qs[idx]; if(i===cur.i) score++; idx++; if(idx>=qs.length){ q.textContent='Done!'; opts.innerHTML=''; out.textContent=`Final Score: ${score}/${qs.length}`; } else render(); }
  el.append(q,opts,out); mount.appendChild(el); render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


