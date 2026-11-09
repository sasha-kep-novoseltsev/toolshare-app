// Сітка місяця: тиждень з понеділка, статус дати видно не лише кольором
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

export default function MonthGrid({ month, statusOf, start, end, onPick }) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const rangeEnd = end || start;

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {WEEKDAYS.map((w) => <span key={w} className="text-xs text-muted">{w}</span>)}
      {cells.map((date, i) => {
        if (!date) return <span key={`e${i}`} />;
        const st = statusOf(date);
        const inRange = start && date >= start && date <= rangeEnd;
        const blocked = st !== 'Вільно';
        const cls = inRange ? 'bg-btn text-btn-ink font-bold'
          : st === 'Заброньовано' ? 'bg-btn-off text-off line-through'
          : blocked ? 'text-off'
          : 'border border-line-off text-ink';
        return (
          <button key={date.getTime()} type="button" disabled={blocked} onClick={() => onPick(date)}
            title={st} aria-label={`${date.getDate()} — ${inRange ? 'обрано' : st.toLowerCase()}`}
            className={`h-9 rounded-lg text-xs ${cls}`}>
            {date.getDate()}
          </button>
        );
      })}
    </div>
  );
}
