import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Field from '../ui/Field.jsx';
import Photos from './Photos.jsx';

const CONDITIONS = ['Справний', 'Пошкоджений'];

// Акт повернення (історія 4.2): для пошкодження обов'язкові коментар і фото
export default function ReturnAct({ stage, onCreate, onSign, depositStatus }) {
  const [cond, setCond] = useState('Справний');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState(0);
  const [errors, setErrors] = useState({});
  const editable = stage === 'issued';

  const create = () => {
    const e = {};
    if (cond === 'Пошкоджений' && !note.trim()) e.note = 'Опишіть пошкодження';
    if (cond === 'Пошкоджений' && photos === 0) e.photos = 'Додайте принаймні одне фото';
    setErrors(e);
    if (!Object.keys(e).length) onCreate();
  };

  return (
    <div className="flex flex-col gap-3 rounded-card border border-brand bg-surface p-4">
      <h2 className="text-xl font-bold">Акт повернення</h2>
      <div className="flex gap-2">
        {CONDITIONS.map((c) => (
          <button key={c} type="button" disabled={!editable} onClick={() => setCond(c)}
            className={`rounded-full px-4 py-2 text-xs ${cond === c ? 'bg-btn text-btn-ink' : 'border border-line bg-surface'}`}>{c}</button>
        ))}
      </div>
      <Field label="Коментар" value={note} onChange={(e) => setNote(e.target.value)}
        placeholder={cond === 'Пошкоджений' ? 'Подряпина на корпусі' : 'Необов’язково'}
        state={errors.note ? 'error' : editable ? 'default' : 'disabled'} message={errors.note} />
      <Photos count={photos} onAdd={editable ? () => setPhotos(photos + 1) : null} />
      {errors.photos && <p className="text-xs font-bold text-err">{errors.photos}</p>}
      {stage === 'issued' && <Button onClick={create}>Оформити акт повернення</Button>}
      {stage === 'return' && <Button onClick={() => onSign(cond)}>Підписати акт повернення</Button>}
      {stage === 'closed' && (
        <>
          <p className="text-xs">Підписаний акт змінити неможливо. Застава: <b>{depositStatus}</b></p>
          <Link to="/bookings" className="text-center text-sm font-bold text-brand">До моїх оренд</Link>
        </>
      )}
    </div>
  );
}
