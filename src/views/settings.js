import { settings } from '../core/settings.js';
import { storage } from '../core/storage.js';

export function renderSettings(root){
  const el = document.createElement('section');
  const perf = storage.get('settings.performance','high');
  const colorblind = storage.get('settings.colorblind','off');
  el.innerHTML = `
    <h2>Settings</h2>
    <div class="toolbar">
      <label>Performance Mode
        <select id="perf">
          <option value="high" ${perf==='high'?'selected':''}>High</option>
          <option value="medium" ${perf==='medium'?'selected':''}>Medium</option>
          <option value="low" ${perf==='low'?'selected':''}>Low</option>
        </select>
      </label>
      <label>Colorblind Mode
        <select id="cb">
          <option value="off" ${colorblind==='off'?'selected':''}>Off</option>
          <option value="deuteranopia" ${colorblind==='deuteranopia'?'selected':''}>Deuteranopia</option>
          <option value="protanopia" ${colorblind==='protanopia'?'selected':''}>Protanopia</option>
          <option value="tritanopia" ${colorblind==='tritanopia'?'selected':''}>Tritanopia</option>
        </select>
      </label>
    </div>
  `;
  root.appendChild(el);
  el.querySelector('#perf').addEventListener('change', (e)=> settings.setPerformance(e.target.value));
  el.querySelector('#cb').addEventListener('change', (e)=> settings.setColorblind(e.target.value));
}


