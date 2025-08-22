export function createGame({ mount }){
  const words=['puzzle','arcade','canvas','player','victory','score'];
  let word = words[Math.floor(Math.random()*words.length)];
  let scrambled = word.split('').sort(()=>Math.random()-0.5).join('');
  const el=document.createElement('div'); el.style.textAlign='center';
  el.innerHTML = `<h3>Unscramble: ${scrambled}</h3><input id="in" /><button id="go">Check</button><p id="out"></p>`;
  el.querySelector('#go').addEventListener('click',()=>{ const v=el.querySelector('#in').value.trim().toLowerCase(); el.querySelector('#out').textContent = v===word? 'Correct!':'Try again'; });
  mount.appendChild(el);
  return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
}


