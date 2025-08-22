import { storage } from '../core/storage.js';

export function renderProfile(root) {
  const profile = storage.get('profile', { name: '', avatar: '', bio: '' });
  const modal = document.createElement('div');
  modal.className = 'profile-modal';
  modal.innerHTML = `
    <div class="profile-card">
      <h3>Player Profile</h3>
      <input id="name" placeholder="Name" value="${profile.name || ''}" />
      <input id="avatar" placeholder="Avatar URL" value="${profile.avatar || ''}" />
      <textarea id="bio" rows="3" placeholder="Bio">${profile.bio || ''}</textarea>
      <div class="actions">
        <button id="save">Save</button>
        <button id="cancel">Cancel</button>
      </div>
    </div>
  `;
  root.appendChild(modal);
  modal.querySelector('#cancel').addEventListener('click', () => root.removeChild(modal));
  modal.querySelector('#save').addEventListener('click', () => {
    const next = {
      name: modal.querySelector('#name').value.trim(),
      avatar: modal.querySelector('#avatar').value.trim(),
      bio: modal.querySelector('#bio').value.trim(),
    };
    storage.set('profile', next);
    root.removeChild(modal);
  });
}


