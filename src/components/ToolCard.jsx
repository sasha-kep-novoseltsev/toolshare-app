import { Link } from 'react-router-dom';
import { km, uah } from '../utils/format.js';

export default function ToolCard({ tool }) {
  return (
    <Link to={`/tool/${tool.id}`} className="flex flex-col gap-2 rounded-card border border-line-off bg-surface p-4 transition hover:border-brand active:scale-[0.99]">
      <div className="flex justify-between gap-2">
        <span className="text-sm font-bold">{tool.name}</span>
        <span className="text-sm font-bold">{uah(tool.price)}/доба</span>
      </div>
      <span className="text-xs text-muted">
        {tool.type} · {km(tool.km)} · {tool.mine ? 'ваше оголошення' : `${tool.owner}, ${tool.rentals} оренд`}
      </span>
    </Link>
  );
}
