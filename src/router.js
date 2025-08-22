import { renderHome } from './views/home.js';
import { renderGames } from './views/games.js';
import { renderAbout } from './views/about.js';
import { renderContact } from './views/contact.js';
import { renderProfile } from './views/profile.js';
import { renderSettings } from './views/settings.js';
import { renderModes } from './views/modes.js';

const routes = {
  '/': renderHome,
  '/games': renderGames,
  '/about': renderAbout,
  '/contact': renderContact,
  '/profile': renderProfile,
  '/settings': renderSettings,
  '/modes': renderModes,
};

function render(pathname) {
  const viewRoot = document.getElementById('view-root');
  const renderFn = routes[pathname] || renderHome;
  viewRoot.innerHTML = '';
  renderFn(viewRoot);
}

export const router = {
  init() {
    window.addEventListener('popstate', () => render(location.pathname));
    render(location.pathname);
  },
  navigate(pathname) {
    history.pushState({}, '', pathname);
    render(pathname);
  }
};


