import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import Row from '../components/Row.jsx';
import { useBooking } from '../state/BookingContext.jsx';
import { quote, fmtPeriod } from '../utils/quote.js';
import { uah } from '../utils/format.js';

// Тестовий платіжний шлюз: …4242 успішна, …0002 відмова
function testGateway(card) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(card.endsWith('0002') ? { ok: false } : { ok: true, txId: 'TX-' + Date.now().toString().slice(-8) }), 900);
  });
}

export default function PaymentScreen() {
  const navigate = useNavigate();
  const { problemId, removed, range, booking, setBooking, history, bookedDates, setBookedDates } = useBooking();
  const [card, setCard] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [declined, setDeclined] = useState(false);
  const [busy, setBusy] = useState(false);

  const q = quote(problemId, removed, range);
  if (!q) return <Navigate to="/picker" replace />;
  if (booking?.status === 'Оплачено') return <Navigate to="/safety" replace />;

  const pay = async () => {
    if (busy) return; // захист від подвійного списання
    const digits = card.replace(/\s/g, '');
    const e = {};
    if (!/^\d{16}$/.test(digits)) e.card = 'Введіть 16 цифр номера картки';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) e.expiry = 'Формат ММ/РР';
    if (!/^\d{3}$/.test(cvv)) e.cvv = '3 цифри';
    setErrors(e);
    setDeclined(false);
    if (Object.keys(e).length) return;
    setBusy(true);
    const res = await testGateway(digits);
    setBusy(false);
    if (!res.ok) { setDeclined(true); return; }
    // Зберігаються лише останні 4 цифри, без номера, строку й CVV
    // Дати оплаченої оренди стають недоступними для інших
    const days = [];
    for (let t = q.start.getTime(); t <= q.end.getTime(); t += 24 * 60 * 60 * 1000) days.push(t);
    const nextBooked = { ...bookedDates };
    q.tools.forEach((tool) => { nextBooked[tool.id] = [...(nextBooked[tool.id] || []), ...days]; });
    setBookedDates(nextBooked);
    setBooking({
      id: 1001 + history.length, status: 'Оплачено', title: q.problem.title, period: fmtPeriod(q), rent: q.rent, deposit: q.deposit, commission: q.commission,
      payout: q.payout, last4: digits.slice(-4), txId: res.txId, depositStatus: 'Заблоковано', payoutStatus: 'Очікує акта видачі',
    });
    setCvv('');
    navigate('/safety');
  };

  return (
    <AppScreen>
      <Link to={`/calendar/${q.problem.id}`} className="text-sm font-bold text-brand">Назад · Календар</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Оплата бронювання</h1>
        <p className="text-xs text-muted">{q.problem.title} · {fmtPeriod(q)}</p>
      </div>
      <div className="rounded-ui border border-warn bg-surface px-4 py-3 text-xs font-bold text-warn">
        Тестовий режим: реальні гроші не списуються
      </div>
      <div className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
        <Row label={`Оренда, ${q.days} ${q.days === 1 ? 'доба' : q.days < 5 ? 'доби' : 'діб'}`} value={uah(q.rent)} />
        <Row label={`Застава (3 × ${uah(q.deposit / 3)})`} value={uah(q.deposit)} />
        <div className="border-t border-line-off pt-2"><Row label="Разом до сплати" value={uah(q.total)} strong /></div>
        <p className="text-xs text-muted">Комісію {uah(q.commission)} (10 %) сервіс утримує з виплати власникам</p>
      </div>
      <Field label="Номер картки" value={card} onChange={(e) => setCard(e.target.value)}
        state={errors.card ? 'error' : busy ? 'disabled' : 'default'}
        message={errors.card || 'Тестові картки: …4242 успішна, …0002 відмова. Зберігаємо лише останні 4 цифри'} />
      <div className="flex gap-3">
        <Field label="Строк дії" value={expiry} onChange={(e) => setExpiry(e.target.value)}
          state={errors.expiry ? 'error' : busy ? 'disabled' : 'default'} message={errors.expiry} />
        <Field label="CVV" type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="•••"
          state={errors.cvv ? 'error' : busy ? 'disabled' : 'default'} message={errors.cvv} />
      </div>
      {declined && (
        <p role="alert" className="animate-toast rounded-ui border-2 border-err bg-surface px-4 py-3 text-xs font-bold text-err">
          Оплату відхилено. Бронювання збережено, спробуйте іншу картку
        </p>
      )}
      <Button disabled={busy} onClick={pay}>{busy ? 'Обробляємо платіж…' : `Сплатити ${uah(q.total)}`}</Button>
    </AppScreen>
  );
}
