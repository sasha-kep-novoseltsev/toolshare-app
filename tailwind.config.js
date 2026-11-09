// Назви кольорів збігаються зі змінними колекції «Теми» з ЛР4
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--c-page)',
        surface: 'var(--c-surface)',
        tint: 'var(--c-tint)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        off: 'var(--c-off)',
        btn: 'var(--c-btn)',
        'btn-hover': 'var(--c-btn-hover)',
        'btn-off': 'var(--c-btn-off)',
        'btn-ink': 'var(--c-btn-ink)',
        line: 'var(--c-line)',
        'line-off': 'var(--c-line-off)',
        err: 'var(--c-err)',
        ok: 'var(--c-ok)',
        warn: 'var(--c-warn)',
        brand: 'var(--c-brand)',
      },
      fontFamily: { sans: ['Montserrat', 'system-ui', 'sans-serif'] },
      borderRadius: { ui: '12px', card: '24px' },
    },
  },
  plugins: [],
};
