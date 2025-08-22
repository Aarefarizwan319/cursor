const PREFIX = 'gamehub.v1.';

function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}

function update(key, updater, fallback = null) {
  const current = get(key, fallback);
  const next = updater(current);
  set(key, next);
  return next;
}

function pushToList(key, item, max = 10) {
  const list = get(key, []);
  list.unshift(item);
  const unique = [];
  const seen = new Set();
  for (const it of list) {
    const id = JSON.stringify(it);
    if (!seen.has(id)) { seen.add(id); unique.push(it); }
    if (unique.length >= max) break;
  }
  set(key, unique);
  return unique;
}

export const storage = { get, set, update, pushToList };


