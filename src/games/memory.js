export function createGame({ mount }){
  const el=document.createElement('div'); el.style.display='grid'; el.style.placeItems='center'; el.style.height='100%';
  const gridEl=document.createElement('div'); gridEl.style.display='grid'; gridEl.style.gridTemplateColumns='repeat(4, 120px)'; gridEl.style.gap='8px'; el.appendChild(gridEl); mount.appendChild(el);
  const icons=['🍎','🍌','🍇','🍉','🍒','🍓','🥝','🍍'];
  let cards = shuffle([...icons,...icons]).map((v,i)=>({ id:i, v, open:false, matched:false }));
  let openIdx = null; let lock=false; let matches=0;
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()* (i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function render(){ gridEl.innerHTML=''; cards.forEach((c,i)=>{ const b=document.createElement('button'); b.style.height='120px'; b.style.borderRadius='10px'; b.style.fontSize='40px'; b.textContent = (c.open||c.matched)? c.v : '❔'; b.disabled=c.matched; b.addEventListener('click',()=>flip(i)); gridEl.appendChild(b); }); }
  function flip(i){ if(lock) return; const c=cards[i]; if(c.open||c.matched) return; c.open=true; if(openIdx==null){ openIdx=i; } else { lock=true; if(cards[openIdx].v===c.v){ cards[openIdx].matched=c.matched=true; matches++; openIdx=null; lock=false; } else { setTimeout(()=>{ cards[openIdx].open=false; c.open=false; openIdx=null; lock=false; render(); }, 600); } }
    render(); if(matches===icons.length){ /* win */ }
  }
  render();
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


