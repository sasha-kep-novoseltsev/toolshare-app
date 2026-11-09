// Фото стану інструмента; кнопка «Додати» показується, лише коли передано onAdd
export default function Photos({ count, onAdd }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="flex h-16 w-20 items-center justify-center rounded-ui bg-tint text-xs">Фото {i + 1}</span>
      ))}
      {onAdd && (
        <button type="button" onClick={onAdd} className="h-16 w-20 rounded-ui border border-dashed border-line text-xs text-muted">
          + Додати фото
        </button>
      )}
    </div>
  );
}
