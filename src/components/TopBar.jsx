import { useState } from 'react';
import { Link } from 'react-router-dom';
import { save } from '../state/storage.js';

export default function TopBar() {
  const [dark, setDark] = useState(document.documentElement.dataset.theme === 'dark');
  const toggle = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    save('theme', next ? 'dark' : 'light');
    setDark(next);
  };
  return (
    <div className="flex items-center justify-between border-b border-line-off bg-surface px-6 py-3">
      <span className="text-sm font-bold text-brand">ToolShare</span>
      <div className="flex items-center gap-4">
        <Link to="/bookings" className="text-xs font-bold text-ink">Мої оренди</Link>
        <button type="button" onClick={toggle} aria-label={dark ? 'Світла тема' : 'Темна тема'}
          className="rounded-ui border border-line-off px-3 py-1 text-xs">
          {dark ? 'Світла' : 'Темна'}
        </button>
      </div>
    </div>
  );
}
