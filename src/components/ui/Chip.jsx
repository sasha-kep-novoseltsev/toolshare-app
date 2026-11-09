export default function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs transition active:scale-95 ${selected ? 'bg-btn text-btn-ink' : 'border border-line bg-surface text-ink'}`}
    >
      {label}
    </button>
  );
}
