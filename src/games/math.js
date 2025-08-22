export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center';
  let a=0,b=0,ans=0,score=0; const q=document.createElement('div'); const input=document.createElement('input'); input.type='number'; const btn=document.createElement('button'); btn.textContent='Submit'; const out=document.createElement('p');
  function next(){ a=1+Math.floor(Math.random()*20); b=1+Math.floor(Math.random()*20); ans=a+b; q.textContent=`${a} + ${b} = ?`; input.value=''; }
  btn.addEventListener('click',()=>{ if(parseInt(input.value,10)===ans){ score++; out.textContent='Correct! Score: '+score; } else { out.textContent='Wrong!'; } next(); });
  el.append(q,input,btn,out); mount.appendChild(el); next();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


