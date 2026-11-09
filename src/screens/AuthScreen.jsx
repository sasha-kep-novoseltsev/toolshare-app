import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneFrame from '../components/PhoneFrame.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import { useBooking } from '../state/BookingContext.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Екран «Авторизація»: брендова шапка і картка входу (мокап ЛР4)
export default function AuthScreen() {
  const navigate = useNavigate();
  const { setUser } = useBooking();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!EMAIL_RE.test(email.trim())) err.email = 'Введіть коректний email';
    if (password.length < 8) err.password = 'Мінімум 8 символів';
    setErrors(err);
    if (Object.keys(err).length) return;
    const name = email.split('@')[0].split('.')[0];
    setUser({ email: email.trim(), name: name.charAt(0).toUpperCase() + name.slice(1) });
    navigate('/search');
  };

  const guest = () => { setUser(null); navigate('/search'); };

  return (
    <PhoneFrame>
      <div className="h-full overflow-y-auto">
        <header className="flex h-[260px] flex-col items-center justify-center gap-3 bg-brand text-btn-ink">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-xl font-bold text-brand">TS</div>
          <h1 className="text-[32px] font-semibold leading-[1.2]">ToolShare</h1>
          <p className="text-xs">Інструменти сусідів — за кілька хвилин</p>
        </header>

        <form onSubmit={submit} noValidate className="relative mx-4 -mt-10 mb-6 flex flex-col gap-4 rounded-card border border-line-off bg-surface p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-[23px] font-semibold leading-[1.2]">Вхід до акаунта</h2>
            <p className="text-xs text-muted">Орендуйте інструменти поруч або здавайте свої</p>
          </div>
          <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="maksym.koval@gmail.com" state={errors.email ? 'error' : 'default'} message={errors.email} />
          <Field label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" state={errors.password ? 'error' : 'default'} message={errors.password || 'Мінімум 8 символів'} />
          <button type="button" className="self-end text-sm font-bold text-brand">Забули пароль?</button>
          <Button type="submit" className="w-full">Увійти</Button>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line-off" />або<span className="h-px flex-1 bg-line-off" />
          </div>
          <button type="button" onClick={guest} className="text-sm font-bold text-brand">Шукати без входу</button>
          <p className="text-center text-xs text-muted">Немає акаунта? Зареєструватися</p>
        </form>
      </div>
    </PhoneFrame>
  );
}
