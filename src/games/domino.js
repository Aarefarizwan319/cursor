export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center';
  el.innerHTML='<p>Simple Dominoes placeholder: basic draw/lay tiles (future full rules)</p>';
  mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


