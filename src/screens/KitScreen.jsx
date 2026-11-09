import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import { PROBLEMS, buildKit } from '../data/problems.js';
import { useBooking } from '../state/BookingContext.jsx';
import { km, uah } from '../utils/format.js';

export default function KitScreen() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { removed, setRemoved } = useBooking();
  const problem = PROBLEMS.find((p) => p.id === problemId);
  if (!problem) return <Navigate to="/picker" replace />;

  const kit = buildKit(problem);
  const active = kit.filter((k) => k.tool && !removed.includes(k.tool.id));
  const perDay = active.reduce((s, k) => s + k.tool.price, 0);
  const lastRemoved = removed[removed.length - 1];
  const lastName = kit.find((k) => k.tool && k.tool.id === lastRemoved)?.tool.name;

  return (
    <AppScreen nav="Підбір">
      <Link to="/picker" className="text-sm font-bold text-brand">Назад · Підбір</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">{problem.title}</h1>
        <p className="text-xs text-muted">Найближчі інструменти в радіусі 10 км</p>
      </div>

      {kit.map(({ kind, tool }) => {
        if (!tool) {
          return (
            <div key={kind} className="rounded-card border border-line-off bg-surface p-4 text-xs text-muted">
              {kind}: недоступно поблизу
            </div>
          );
        }
        if (removed.includes(tool.id)) return null;
        return (
          <div key={tool.id} className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
            <div className="flex justify-between gap-2">
              <span className="text-sm font-bold">{tool.name}</span>
              <span className="text-sm font-bold">{uah(tool.price)}/доба</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-xs text-muted">{kind} · {km(tool.km)}</span>
              <button
                type="button"
                onClick={() => setRemoved([...removed, tool.id])}
                className="text-sm font-bold text-brand"
              >
                Прибрати
              </button>
            </div>
          </div>
        );
      })}

      {lastName && (
        <div key={lastRemoved} className="animate-toast flex items-center justify-between gap-2 rounded-ui bg-tint px-4 py-3">
          <span className="text-xs">{lastName}: прибрано, суму перераховано</span>
          <button
            type="button"
            onClick={() => setRemoved(removed.slice(0, -1))}
            className="text-sm font-bold text-brand"
          >
            Повернути
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 rounded-card border border-brand bg-surface p-4">
        <div className="flex justify-between">
          <span className="text-xs text-muted">Разом за добу</span>
          <span className="text-xl font-bold">{uah(perDay)}</span>
        </div>
        <span className="text-xs text-muted">
          {active.length} шт. · вартість за період з'явиться після вибору дат
        </span>
      </div>

      <Button disabled={active.length === 0} onClick={() => navigate(`/calendar/${problem.id}`)}>
        Обрати дати
      </Button>
    </AppScreen>
  );
}
