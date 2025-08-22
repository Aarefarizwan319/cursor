export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center';
  const out=document.createElement('div'); out.style.fontSize='48px'; out.textContent='🎲';
  const btn=document.createElement('button'); btn.textContent='Roll'; btn.style.display='block'; btn.style.margin='12px auto';
  btn.addEventListener('click',()=>{ const n=1+Math.floor(Math.random()*6); out.textContent = '🎲 '+n; });
  el.appendChild(out); el.appendChild(btn); mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


