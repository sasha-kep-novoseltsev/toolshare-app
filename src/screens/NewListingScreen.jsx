import { useState } from 'react';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import Field from '../components/ui/Field.jsx';
import Chip from '../components/ui/Chip.jsx';
import { WORK_TYPES } from '../data/tools.js';
import { useBooking } from '../state/BookingContext.jsx';
import { uah } from '../utils/format.js';

const empty = { name: '', type: '', price: '', newPrice: '', photos: 0 };

export default function NewListingScreen() {
  const { listings, setListings, user } = useBooking();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const publish = () => {
    const price = Number(String(form.price).replace(',', '.'));
    const newPrice = form.newPrice ? Number(String(form.newPrice).replace(',', '.')) : 0;
    const e = {};
    if (!form.name.trim()) e.name = 'Вкажіть назву інструменту';
    if (!form.type) e.type = 'Оберіть тип робіт';
    if (!(price > 0)) e.price = 'Вкажіть ціну за добу більшу за 0';
    if (form.newPrice && !(newPrice > 0)) e.newPrice = 'Ціна має бути більшою за 0';
    if (form.photos === 0) e.photos = 'Додайте принаймні одне фото';
    setErrors(e);
    if (Object.keys(e).length) return;
    const item = {
      id: 'my-' + Date.now(), name: form.name.trim(), type: form.type, price, newPrice,
      km: 0.3, owner: user?.name || 'Ви', rentals: 0, rating: 5, mine: true, photos: form.photos,
    };
    setListings([item, ...listings]);
    setForm(empty);
    setDone(`Оголошення «${item.name}» опубліковано. Воно вже є в пошуку за типом «${item.type}»`);
  };

  return (
    <AppScreen nav="Здати">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">Нове оголошення</h1>
        <p className="text-xs text-muted">Здавайте інструменти, що простоюють</p>
      </div>
      {done && <p role="status" className="animate-toast rounded-ui border border-ok bg-surface px-4 py-3 text-xs font-bold text-ok">{done}</p>}
      <Field label="Назва інструменту" value={form.name} onChange={set('name')} placeholder="Шуруповерт DeWalt DCD771"
        state={errors.name ? 'error' : 'default'} message={errors.name} />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold">Тип робіт</span>
        <div className="flex flex-wrap gap-2">
          {WORK_TYPES.map((w) => <Chip key={w} label={w} selected={form.type === w} onClick={() => setForm({ ...form, type: w })} />)}
        </div>
        {errors.type && <span className="text-xs text-err">{errors.type}</span>}
      </div>
      <Field label="Ціна за добу, грн" value={form.price} onChange={set('price')} placeholder="70"
        state={errors.price ? 'error' : 'default'} message={errors.price} />
      <Field label="Орієнтовна ціна нового, грн" value={form.newPrice} onChange={set('newPrice')} placeholder="Необов’язково"
        state={errors.newPrice ? 'error' : 'default'} message={errors.newPrice || 'Допоможе орендарям порівняти оренду з купівлею'} />
      <div className="flex gap-2">
        {Array.from({ length: form.photos }, (_, i) => (
          <span key={i} className="flex h-[72px] w-24 items-center justify-center rounded-ui bg-tint text-xs">Фото {i + 1}</span>
        ))}
        <button type="button" onClick={() => setForm({ ...form, photos: form.photos + 1 })}
          className="h-[72px] w-24 rounded-ui border border-dashed border-line text-xs text-muted">+ Додати фото</button>
      </div>
      {errors.photos && <span className="text-xs text-err">{errors.photos}</span>}
      <Button onClick={publish}>Опублікувати</Button>

      {listings.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Мої оголошення</h2>
          {listings.map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-2 rounded-card border border-line-off bg-surface p-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold">{l.name}</span>
                <span className="text-xs text-muted">{l.type} · {uah(l.price)}/доба</span>
              </div>
              <button type="button" onClick={() => setListings(listings.filter((x) => x.id !== l.id))}
                className="text-sm font-bold text-err">Видалити</button>
            </div>
          ))}
        </div>
      )}
    </AppScreen>
  );
}
