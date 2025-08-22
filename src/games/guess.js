export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center';
  const n = Math.floor(Math.random()*100)+1; let tries=0; let over=false;
  el.innerHTML = `
    <h3>Number Guess (1-100)</h3>
    <input id="in" type="number" min="1" max="100" />
    <button id="go">Guess</button>
    <p id="out"></p>
  `;
  const out=el.querySelector('#out');
  el.querySelector('#go').addEventListener('click',()=>{
    if(over) return; const v=parseInt(el.querySelector('#in').value,10); tries++; if(v===n){ out.textContent=`Correct in ${tries} tries!`; over=true; } else { out.textContent = v<n? 'Too low':'Too high'; }
  });
  mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


