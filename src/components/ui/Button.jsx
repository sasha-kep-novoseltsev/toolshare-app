// Кнопка: висота 48, радіус 12; стани default / hover / disabled
export default function Button({ children, disabled = false, type = 'button', className = '', ...rest }) {
  const state = disabled
    ? 'bg-btn-off text-off cursor-not-allowed'
    : 'bg-btn text-btn-ink hover:bg-btn-hover active:scale-[0.98]';
  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-12 rounded-ui px-6 text-base font-bold leading-6 transition ${state} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
