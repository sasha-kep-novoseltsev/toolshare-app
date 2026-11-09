import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import { useBooking } from '../state/BookingContext.jsx';

const RULES = [
  'Перевірте кабель і вилку: без тріщин і оголених дротів.',
  'Перед свердлінням стіни перевірте проводку детектором.',
  'Працюйте в захисних окулярах, тримайте дриль двома руками.',
  'Змінюйте свердло лише при вимкненому з мережі інструменті.',
];

const stamp = (d) => `${d.toLocaleDateString('uk-UA')} о ${d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`;

export default function SafetyScreen() {
  const navigate = useNavigate();
  const { booking, safetyAt, setSafetyAt } = useBooking();
  if (!booking) return <Navigate to="/picker" replace />;
  const confirmed = Boolean(safetyAt);

  return (
    <AppScreen>
      <Link to="/payment" className="text-sm font-bold text-brand">Назад · Оплата</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Інструкція з безпеки</h1>
        <p className="text-xs text-muted">Прочитайте перед отриманням інструментів</p>
      </div>
      <p className="rounded-ui bg-tint px-4 py-3 text-xs">
        Оплачено · бронювання №{booking.id} · картка …{booking.last4}
      </p>
      <ol className="flex list-decimal flex-col gap-2 rounded-card border border-line-off bg-surface py-4 pl-9 pr-4 text-xs">
        {RULES.map((r) => <li key={r}>{r}</li>)}
      </ol>
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={confirmed}
          onChange={(e) => setSafetyAt(e.target.checked ? new Date() : null)}
          className="h-6 w-6 shrink-0 accent-[var(--c-btn)]" />
        <span className="text-sm font-bold">Я ознайомився з інструкцією з безпеки</span>
      </label>
      <p className={`text-xs ${confirmed ? 'text-ok' : 'text-muted'}`}>
        {confirmed ? `Ознайомлення зафіксовано ${stamp(safetyAt)}` : 'Спершу ознайомтесь з інструкцією з безпеки'}
      </p>
      <Button disabled={!confirmed} onClick={() => navigate('/act')}>Перейти до акту</Button>
    </AppScreen>
  );
}
