import { Link } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Field from '../components/ui/Field.jsx';
import { PROBLEMS, KIT_RADIUS, buildKit } from '../data/problems.js';
import { useBooking } from '../state/BookingContext.jsx';
import { uah } from '../utils/format.js';

export default function PickerScreen() {
  const { location, setLocation, setRemoved, setRange, setProblemId, setBooking, setSafetyAt } = useBooking();
  const noLocation = location.trim() === '';

  return (
    <AppScreen nav="Підбір">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Що потрібно зробити?</h1>
        <p className="text-xs text-muted">Оберіть задачу: підберемо інструменти поруч і порахуємо вартість</p>
      </div>
      <Field
        label="Ваше місцезнаходження"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        state={noLocation ? 'error' : 'default'}
        message={noLocation ? 'Вкажіть місцезнаходження, щоб підібрати інструменти поруч' : ''}
      />
      {!noLocation && PROBLEMS.map((p) => {
        const kit = buildKit(p);
        const found = kit.filter((k) => k.tool);
        const perDay = found.reduce((s, k) => s + k.tool.price, 0);
        if (found.length === 0) {
          return (
            <div key={p.id} className="flex flex-col gap-2 rounded-card border border-warn bg-surface p-4">
              <span className="text-sm font-bold">{p.title}</span>
              <span className="text-xs text-warn">
                Для цієї проблеми поблизу немає доступних інструментів (радіус {KIT_RADIUS} км)
              </span>
            </div>
          );
        }
        return (
          <Link
            key={p.id}
            to={`/kit/${p.id}`}
            onClick={() => { setProblemId(p.id); setRemoved([]); setRange({ start: null, end: null }); setBooking(null); setSafetyAt(null); }}
            className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4"
          >
            <div className="flex justify-between gap-2">
              <span className="text-sm font-bold">{p.title}</span>
              <span className="text-sm font-bold">{uah(perDay)}/доба</span>
            </div>
            <span className="text-xs text-muted">
              {p.kinds.join(', ')} · {found.length} {found.length === 1 ? 'інструмент' : 'інструменти'}
            </span>
          </Link>
        );
      })}
    </AppScreen>
  );
}
