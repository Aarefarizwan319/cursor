export function createGame({ mount }){
  const words=['JAVASCRIPT','CANVAS','PUZZLE','ARCADE','HANGMAN','CONNECT','BREAKOUT'];
  const word = words[Math.floor(Math.random()*words.length)];
  let guessed=new Set(); let wrong=0; let over=false;
  const el=document.createElement('div'); el.style.textAlign='center';
  const out=document.createElement('p'); const kbd=document.createElement('div'); kbd.style.display='grid'; kbd.style.gridTemplateColumns='repeat(13, 1fr)'; kbd.style.gap='4px';
  function mask(){ return word.split('').map(ch=> guessed.has(ch)? ch : '_').join(' '); }
  function render(){ out.textContent = `Word: ${mask()}  Wrong: ${wrong}/6`; kbd.innerHTML='';
    for(const code of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')){ const b=document.createElement('button'); b.textContent=code; b.disabled=guessed.has(code)||over; b.addEventListener('click',()=>pick(code)); kbd.appendChild(b); }
  }
  function pick(ch){ if(over) return; guessed.add(ch); if(!word.includes(ch)){ wrong++; if(wrong>=6){ over=true; out.textContent = `You lose! Word: ${word}`; } }
    if(word.split('').every(ch=>guessed.has(ch))){ over=true; out.textContent = `You win! Word: ${word}`; }
    render();
  }
  el.appendChild(out); el.appendChild(kbd); render(); mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


