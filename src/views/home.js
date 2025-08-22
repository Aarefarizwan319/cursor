import { router } from '../router.js';

export function renderHome(root) {
  const wrap = document.createElement('section');
  wrap.innerHTML = `
    <div class="hero">
      <h1>Welcome to GameHub</h1>
      <p>Play 30+ mini games, offline-ready and mobile-friendly.</p>
      <button class="cta" id="enter">Enter Hub</button>
    </div>
  `;
  root.appendChild(wrap);
  wrap.querySelector('#enter').addEventListener('click', () => router.navigate('/games'));
}


