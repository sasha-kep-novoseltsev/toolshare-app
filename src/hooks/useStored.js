import { useEffect, useState } from 'react';
import { load, save } from '../state/storage.js';

// useState, значення якого переживає перезавантаження сторінки
export default function useStored(key, initial) {
  const [value, setValue] = useState(() => load(key, initial));
  useEffect(() => { save(key, value); }, [key, value]);
  return [value, setValue];
}
