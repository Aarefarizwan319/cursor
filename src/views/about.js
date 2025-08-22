export function renderAbout(root) {
  const el = document.createElement('section');
  el.innerHTML = `
    <h2>About GameHub</h2>
    <p>Built with ❤️ using vanilla HTML, CSS, and JavaScript. Offline-ready PWA with 30+ mini games.</p>
    <p>Credits: Design & Development by You.</p>
  `;
  root.appendChild(el);
}


