import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import MonthGrid from '../components/calendar/MonthGrid.jsx';
import QuoteCard from '../components/calendar/QuoteCard.jsx';
import { PROBLEMS, buildKit } from '../data/problems.js';
import { TODAY, BASE_BOOKED } from '../data/tools.js';
import { useBooking } from '../state/BookingContext.jsx';
import { DAY, MAX_DAYS, HORIZON_DAYS, daysBetween } from '../utils/pricing.js';
import { quote } from '../utils/quote.js';

const HORIZON_END = new Date(TODAY.getTime() + (HORIZON_DAYS - 1) * DAY);
const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

export default function CalendarScreen() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { removed, range, setRange, setProblemId, bookedDates } = useBooking();
  const [month, setMonth] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [error, setError] = useState('');
  const problem = PROBLEMS.find((p) => p.id === problemId);
  if (!problem) return <Navigate to="/picker" replace />;

  const tools = buildKit(problem).filter((k) => k.tool && !removed.includes(k.tool.id)).map((k) => k.tool);
  // Дата зайнята, якщо її заброньовано для будь-якого інструмента набору
  const booked = new Set([...BASE_BOOKED, ...tools.flatMap((t) => bookedDates[t.id] || [])]);
  const statusOf = (d) => (d < TODAY ? 'Минуло' : d > HORIZON_END ? 'Поза горизонтом'
    : booked.has(d.getTime()) ? 'Заброньовано' : 'Вільно');
  const { start, end } = range;

  // Перший клік задає початок, другий кінець (критерій 3 історії 3.1)
  const pick = (date) => {
    setError('');
    if (!start || end || date < start) { setRange({ start: date, end: null }); return; }
    if ([...booked].some((b) => b >= start.getTime() && b <= date.getTime())) { setError('У вибраному періоді є зайняті дати'); return; }
    if (daysBetween(start, date) > MAX_DAYS) { setError(`Максимум ${MAX_DAYS} діб`); return; }
    setRange({ start, end: date });
  };

  const shift = (n) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  const canPrev = month > new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= HORIZON_END;
  const q = quote(problem.id, removed, range);

  return (
    <AppScreen>
      <Link to={`/kit/${problem.id}`} className="text-sm font-bold text-brand">Назад · Набір</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Оберіть дати</h1>
        <p className="text-xs text-muted">Набір «{problem.title}» · від 1 до {MAX_DAYS} діб</p>
      </div>
      <div className="flex items-center justify-between">
        <button type="button" disabled={!canPrev} onClick={() => shift(-1)} aria-label="Попередній місяць"
          className="px-2 text-sm font-bold text-brand disabled:text-off">‹</button>
        <span className="text-xl font-bold">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
        <button type="button" disabled={!canNext} onClick={() => shift(1)} aria-label="Наступний місяць"
          className="px-2 text-sm font-bold text-brand disabled:text-off">›</button>
      </div>
      <MonthGrid month={month} statusOf={statusOf} start={start} end={end} onPick={pick} />
      <p className="text-xs text-muted">Закреслено: заброньовано · сірим: минуло · синім: обрано</p>
      {error && <p role="alert" className="animate-toast text-xs font-bold text-err">{error}</p>}
      {q ? <QuoteCard q={q} /> : <p className="text-xs text-muted">Оберіть першу і останню дату оренди</p>}
      <Button disabled={!start} onClick={() => { setProblemId(problem.id); navigate('/payment'); }}>
        Перейти до оплати
      </Button>
    </AppScreen>
  );
}
