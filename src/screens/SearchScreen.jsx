import { useState } from 'react';
import AppScreen from '../components/AppScreen.jsx';
import Field from '../components/ui/Field.jsx';
import Chip from '../components/ui/Chip.jsx';
import ToolCard from '../components/ToolCard.jsx';
import { WORK_TYPES, RADII } from '../data/tools.js';
import { useTools } from '../data/useTools.js';
import { useBooking } from '../state/BookingContext.jsx';
import { km } from '../utils/format.js';

export default function SearchScreen() {
  const tools = useTools();
  const { location, setLocation } = useBooking();
  const [type, setType] = useState(WORK_TYPES[0]);
  const [radius, setRadius] = useState(5);
  const [geoMsg, setGeoMsg] = useState('');
  const [locating, setLocating] = useState(false);

  const useGeo = () => {
    setGeoMsg('');
    if (!navigator.geolocation) { setGeoMsg('Не вдалося визначити місцезнаходження. Введіть адресу'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setLocation(`Моє місцезнаходження (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
      },
      () => { setLocating(false); setGeoMsg('Не вдалося визначити місцезнаходження. Введіть адресу'); },
      { timeout: 8000 },
    );
  };

  const noAddress = location.trim() === '';
  const ofType = tools.filter((t) => t.type === type).sort((a, b) => a.km - b.km);
  const found = ofType.filter((t) => t.km <= radius);
  const outside = ofType.find((t) => t.km > radius);

  return (
    <AppScreen nav="Пошук">
      <h1 className="text-[23px] font-semibold leading-[1.2]">Інструменти поруч</h1>
      <Field label="Адреса" value={location} onChange={(e) => { setLocation(e.target.value); setGeoMsg(''); }}
        state={noAddress || geoMsg ? 'error' : 'default'} message={geoMsg || (noAddress ? 'Вкажіть адресу' : '')} />
      <button type="button" onClick={useGeo} disabled={locating} className="self-start text-sm font-bold text-brand">
        {locating ? 'Визначаємо…' : 'Використати моє місцезнаходження'}
      </button>
      <div className="flex flex-wrap gap-2">
        {WORK_TYPES.map((w) => <Chip key={w} label={w} selected={w === type} onClick={() => setType(w)} />)}
      </div>
      <div className="flex flex-wrap gap-2">
        {RADII.map((r) => <Chip key={r} label={`${r} км`} selected={r === radius} onClick={() => setRadius(r)} />)}
      </div>

      {!noAddress && (
        <>
          <div className="relative h-[120px] shrink-0 overflow-hidden rounded-card bg-tint">
            <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-ok" title="Ви тут" />
            {found.slice(0, 4).map((t, i) => {
              // Чим далі інструмент, тим далі пін від точки «Ви тут»
              const angle = [-2.4, 0.4, 2.2, -0.9][i];
              const r = 18 + (t.km / radius) * 42;
              return (
                <span key={t.id} className="absolute flex items-center gap-1 text-xs"
                  style={{ left: `calc(50% + ${Math.max(-140, Math.min(80, Math.cos(angle) * r * 2))}px - 8px)`, top: `calc(50% + ${Math.sin(angle) * r}px - 8px)` }}>
                  <span className="h-4 w-4 rounded-full border-2 border-surface bg-brand" />{km(t.km)}
                </span>
              );
            })}
          </div>
          {found.length === 0 && (
            <p className="rounded-card border border-line-off bg-surface p-4 text-sm text-muted">
              Інструментів не знайдено. Спробуйте збільшити радіус пошуку
            </p>
          )}
          {found.map((t) => <ToolCard key={t.id} tool={t} />)}
          {outside && <p className="text-xs text-muted">{outside.name} ({km(outside.km)}) поза радіусом {radius} км</p>}
        </>
      )}
    </AppScreen>
  );
}
