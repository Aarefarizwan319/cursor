import { storage } from './storage.js';

export const settings = {
  init(){
    const perf = storage.get('settings.performance', 'high');
    document.body.dataset.performance = perf;
    const colorblind = storage.get('settings.colorblind', 'off');
    document.body.dataset.colorblind = colorblind;
  },
  setPerformance(level){ storage.set('settings.performance', level); document.body.dataset.performance = level; },
  setColorblind(mode){ storage.set('settings.colorblind', mode); document.body.dataset.colorblind = mode; },
};


