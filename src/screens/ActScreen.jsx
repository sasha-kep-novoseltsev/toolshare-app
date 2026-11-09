import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import Row from '../components/Row.jsx';
import Photos from '../components/act/Photos.jsx';
import ReturnAct from '../components/act/ReturnAct.jsx';
import { useBooking } from '../state/BookingContext.jsx';
import { quote, fmtPeriod } from '../utils/quote.js';
import { uah } from '../utils/format.js';

const STATUS = {
  issue: 'Очікує підпису орендаря', issued: 'Підписано обома сторонами', rejected: 'Повернено на доопрацювання',
  return: 'Акт повернення: очікує підпису орендаря', closed: 'Оренду завершено',
};

export default function ActScreen() {
  const { problemId, removed, range, booking, setBooking, safetyAt, user } = useBooking();
  // Етап відновлюється зі статусів оренди після перезавантаження: issue → issued → return → closed | rejected
  const [stage, setStage] = useState(() => (booking?.status === 'Завершено' ? 'closed'
    : booking?.payoutStatus === 'Нараховано' ? 'issued' : 'issue'));
  const [rejectNote, setRejectNote] = useState('');
  const [showReject, setShowReject] = useState(false);
  const [rejectError, setRejectError] = useState('');

  const q = quote(problemId, removed, range);
  if (!booking || !q) return <Navigate to="/picker" replace />;
  if (!safetyAt) return <Navigate to="/safety" replace />;

  const signIssue = () => { setBooking({ ...booking, payoutStatus: 'Нараховано' }); setStage('issued'); };
  const reject = () => {
    if (!rejectNote.trim()) { setRejectError('Вкажіть причину'); return; }
    setRejectError('');
    setStage('rejected');
  };
  const signReturn = (cond) => {
    setBooking({ ...booking, status: 'Завершено', depositStatus: cond === 'Справний' ? 'Повернено' : 'Утримано до розгляду' });
    setStage('closed');
  };
  const tone = stage === 'rejected' ? 'text-err' : ['issued', 'closed'].includes(stage) ? 'text-ok' : 'text-warn';

  return (
    <AppScreen>
      <Link to="/safety" className="text-sm font-bold text-brand">Назад · Інструкція</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Акт видачі №{booking.id}</h1>
        <p className={`text-sm font-bold ${tone}`}>{STATUS[stage]}</p>
      </div>
      <div className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
        <Row label="Інструменти" value={q.tools.map((t) => t.name).join(', ')} />
        <Row label="Власник" value={q.tools[0]?.owner || 'Власник'} />
        <Row label="Орендар" value={user?.name || 'Гість'} />
        <Row label="Період" value={fmtPeriod(q)} />
        <Row label="Стан при видачі" value="Справний" tone="text-ok" />
        <Row label={`Застава ${uah(booking.deposit)}`} value={booking.depositStatus} />
        <Row label={`Виплата власнику ${uah(booking.payout)}`} value={booking.payoutStatus} />
      </div>
      <Field label="Коментар власника" value="Без пошкоджень, свердла 6 і 8 мм у кейсі" state="disabled" />
      <Photos count={2} />

      {(stage === 'issue' || stage === 'rejected') ? (
        <>
          {stage === 'rejected' && <p className="text-xs text-muted">Власник отримав ваш коментар: «{rejectNote}»</p>}
          <Button onClick={signIssue}>Підписати акт</Button>
          {!showReject ? (
            <button type="button" onClick={() => setShowReject(true)} className="text-sm font-bold text-err">Відхилити з коментарем</button>
          ) : (
            <>
              <Field label="Причина відхилення" value={rejectNote} onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Є подряпина на корпусі" state={rejectError ? 'error' : 'default'} message={rejectError} />
              <button type="button" onClick={reject} className="text-sm font-bold text-err">Надіслати власнику</button>
            </>
          )}
        </>
      ) : (
        <ReturnAct stage={stage} depositStatus={booking.depositStatus}
          onCreate={() => setStage('return')} onSign={signReturn} />
      )}
    </AppScreen>
  );
}
