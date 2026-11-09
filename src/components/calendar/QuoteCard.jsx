import { fmtPeriod } from '../../utils/quote.js';
import { uah } from '../../utils/format.js';

const dayWord = (n) => (n === 1 ? 'доба' : n < 5 ? 'доби' : 'діб');

// Розбивка вартості за інструментами (критерій 7 історії 5.2) і застава окремо
export default function QuoteCard({ q }) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4">
      <span className="text-xs text-muted">{fmtPeriod(q)} · {q.days} {dayWord(q.days)}</span>
      {q.rows.map(({ tool, sum, tariff }) => (
        <div key={tool.id} className="flex justify-between gap-2">
          <span className="text-xs text-muted">{tool.name} · {uah(tool.price)}/доба · {tariff}</span>
          <span className="text-sm font-bold">{uah(sum)}</span>
        </div>
      ))}
      <div className="flex justify-between border-t border-line-off pt-2">
        <span className="text-sm font-bold">Оренда</span>
        <span className="text-sm font-bold">{uah(q.rent)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-muted">Застава (окремо, повертається)</span>
        <span className="text-sm font-bold">{uah(q.deposit)}</span>
      </div>
    </div>
  );
}
