export function renderContact(root) {
  const el = document.createElement('section');
  el.innerHTML = `
    <h2>Contact</h2>
    <p>Have feedback or ideas? Reach out at <a href="mailto:you@example.com">you@example.com</a>.</p>
  `;
  root.appendChild(el);
}


