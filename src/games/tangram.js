export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center';
  el.innerHTML='<p>Simple Tangram placeholder: drag shapes to fit (future full logic)</p>';
  mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


