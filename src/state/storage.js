// Безпечна робота з LocalStorage: у приватному режимі або при вимкненому сховищі застосунок працює з пам'яттю
const PREFIX = 'toolshare-';

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function save(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* сховище недоступне */ }
}

export function clearAll() {
  try {
    Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k));
  } catch (e) { /* сховище недоступне */ }
}
