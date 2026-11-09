import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import Row from '../components/Row.jsx';
import { useTools } from '../data/useTools.js';
import { km, uah, rating, tariffs } from '../utils/format.js';

export default function ToolScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = useTools().find((t) => t.id === id);
  if (!tool) return <Navigate to="/search" replace />;
  const tr = tariffs(tool.price);
  const who = tool.ownerF ? 'власниця' : 'власник';

  return (
    <AppScreen nav="Пошук">
      <Link to="/search" className="text-sm font-bold text-brand">Назад · Пошук</Link>
      <div className="flex h-[120px] shrink-0 items-center justify-center rounded-card bg-tint text-xs">Фото: {tool.name}</div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">{tool.name}</h1>
        <p className="text-xs text-muted">
          {tool.type} · {km(tool.km)} · {tool.mine ? 'ваше оголошення' : `${who} ${tool.owner}, рейтинг ${rating(tool.rating)}`}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
        <Row label="Доба" value={uah(tr.day)} />
        <Row label="Вихідні (сб–нд)" value={uah(tr.weekend)} />
        <Row label="Тиждень" value={uah(tr.week)} />
        <Row label="Застава (повертається)" value={uah(tr.deposit)} />
        {tool.newPrice > 0 && <Row label="Орієнтовна ціна нового" value={uah(tool.newPrice)} />}
      </div>
      {tool.mine ? (
        <p className="rounded-ui bg-tint px-4 py-3 text-xs">Це ваше оголошення: орендувати власний інструмент не можна</p>
      ) : (
        <>
          <p className="text-xs text-muted">Точну адресу {who} надішле після бронювання</p>
          <Button onClick={() => navigate(`/chat/${tool.id}`)}>Написати {tool.ownerF ? 'власниці' : 'власнику'}</Button>
          <Link to="/picker" className="text-center text-sm font-bold text-brand">Підібрати набір для задачі</Link>
        </>
      )}
    </AppScreen>
  );
}
