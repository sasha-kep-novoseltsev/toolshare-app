// Рядок «назва — значення» для карток з розрахунками
export default function Row({ label, value, strong = false, tone = '' }) {
  return (
    <div className="flex justify-between gap-2">
      <span className={strong ? 'text-sm font-bold' : 'text-xs text-muted'}>{label}</span>
      <span className={`text-right ${strong ? 'text-xl font-bold' : 'text-sm font-bold'} ${tone}`}>{value}</span>
    </div>
  );
}
