import { Link } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Row from '../components/Row.jsx';
import { useBooking } from '../state/BookingContext.jsx';
import { clearAll } from '../state/storage.js';
import { uah } from '../utils/format.js';

export default function BookingsScreen() {
  const { history, user } = useBooking();
  const reset = () => {
    if (window.confirm('Скинути всі демо-дані: оренди, оголошення, чати?')) { clearAll(); window.location.reload(); }
  };
  return (
    <AppScreen>
      <Link to="/search" className="text-sm font-bold text-brand">Назад · Пошук</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Мої оренди</h1>
        <p className="text-xs text-muted">{user ? `${user.name} · ${user.email}` : 'Гість'}</p>
      </div>
      {history.length === 0 && (
        <p className="rounded-card border border-line-off bg-surface p-4 text-sm text-muted">
          Оренд поки немає. <Link to="/picker" className="font-bold text-brand">Підібрати набір</Link>
        </p>
      )}
      {history.map((b) => (
        <div key={b.id} className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
          <div className="flex justify-between gap-2">
            <span className="text-sm font-bold">№{b.id} · {b.title}</span>
            <span className={`text-xs font-bold ${b.status === 'Завершено' ? 'text-ok' : 'text-warn'}`}>{b.status}</span>
          </div>
          <Row label={b.period} value={uah(b.rent + b.deposit)} />
          <Row label="Застава" value={b.depositStatus} />
          <Row label="Виплата власнику" value={b.payoutStatus} />
          <span className="text-xs text-muted">Картка …{b.last4} · {b.txId}</span>
        </div>
      ))}
      <button type="button" onClick={reset} className="mt-auto text-xs text-muted underline">Скинути демо-дані</button>
    </AppScreen>
  );
}
