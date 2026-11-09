import { useId } from 'react';

// Поле введення: підпис, значення, повідомлення; стани default / disabled / error
export default function Field({ label, value, onChange, type = 'text', message = '', state = 'default', placeholder = '' }) {
  const id = useId();
  const box =
    state === 'disabled' ? 'border border-line-off bg-page text-off'
    : state === 'error' ? 'border-2 border-err bg-surface text-ink'
    : 'border border-line bg-surface text-ink focus:border-btn';
  const note = state === 'error' ? 'text-err' : state === 'disabled' ? 'text-off' : 'text-muted';
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-ink">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={state === 'disabled'}
        className={`h-12 w-full rounded-ui px-4 text-sm outline-none placeholder:text-off ${box}`}
      />
      {message && <span className={`text-xs ${note}`}>{message}</span>}
    </div>
  );
}
