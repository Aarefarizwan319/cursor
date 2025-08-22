export function createGame({ mount }){
  const el=document.createElement('div'); el.style.textAlign='center'; el.style.width='100%';
  el.innerHTML = `
    <h3>Rock Paper Scissors</h3>
    <div style="display:flex;gap:8px;justify-content:center;">
      <button data-c="rock">🪨 Rock</button>
      <button data-c="paper">📄 Paper</button>
      <button data-c="scissors">✂️ Scissors</button>
    </div>
    <p id="out"></p>
  `;
  const out = el.querySelector('#out');
  el.addEventListener('click',(e)=>{
    const b=e.target.closest('button[data-c]'); if(!b) return; const me=b.dataset.c; const opts=['rock','paper','scissors']; const ai=opts[Math.floor(Math.random()*3)];
    const res = judge(me, ai); out.textContent = `You: ${me} | AI: ${ai} => ${res}`;
  });
  mount.appendChild(el);
  function judge(a,b){ if(a===b) return 'Draw'; if((a==='rock'&&b==='scissors')||(a==='paper'&&b==='rock')||(a==='scissors'&&b==='paper')) return 'You win'; return 'You lose'; }
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


