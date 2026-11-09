import { Link } from 'react-router-dom';

const ICONS = {
  'Пошук': <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></>,
  'Підбір': <><path d="M4 7h16M4 12h10M4 17h6" /><path d="m17 15 2 2 3-4" /></>,
  'Чат': <path d="M5 5h14v10H9l-4 4z" />,
  'Здати': <><path d="M12 5v14M5 12h14" /></>,
};
const TABS = [['Пошук', '/search'], ['Підбір', '/picker'], ['Чат', '/chat'], ['Здати', '/new']];

export default function BottomNav({ active }) {
  return (
    <nav className="flex justify-between border-t border-line-off bg-surface px-4 py-2">
      {TABS.map(([label, to]) => {
        const on = label === active;
        return (
          <Link key={label} to={to} aria-current={on ? 'page' : undefined}
            className={`flex w-16 flex-col items-center gap-1 rounded-ui py-1.5 text-xs transition ${on ? 'bg-tint font-bold text-ink' : 'text-muted hover:text-ink'}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[label]}
            </svg>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
