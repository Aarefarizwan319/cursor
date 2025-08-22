import { storage } from './storage.js';

export const progression = {
  addXp(amount){
    const p = storage.get('progress', { xp: 0, level: 1, coins: 0, badges: [] });
    p.xp += amount;
    while (p.xp >= xpForLevel(p.level+1)) p.level++;
    storage.set('progress', p);
    return p;
  },
  addCoins(amount){
    const p = storage.get('progress', { xp: 0, level: 1, coins: 0, badges: [] });
    p.coins += amount;
    storage.set('progress', p);
    return p;
  },
  awardBadge(id, name){
    const p = storage.get('progress', { xp: 0, level: 1, coins: 0, badges: [] });
    if (!p.badges.find(b=>b.id===id)) p.badges.push({ id, name, t: Date.now() });
    storage.set('progress', p);
    return p;
  },
  get(){ return storage.get('progress', { xp: 0, level: 1, coins: 0, badges: [] }); }
};

function xpForLevel(level){ return level*level*100; }


