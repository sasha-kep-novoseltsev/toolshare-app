import { createContext, useContext, useMemo } from 'react';
import useStored from '../hooks/useStored.js';

const Ctx = createContext(null);

const toDate = (ms) => (ms === null || ms === undefined ? null : new Date(ms));
const toMs = (d) => (d ? d.getTime() : null);

export function BookingProvider({ children }) {
  const [user, setUser] = useStored('user', null);                 // { name, email } або null для гостя
  const [location, setLocation] = useStored('location', 'вул. Сумська, 10, Харків');
  const [problemId, setProblemId] = useStored('problem', null);
  const [removed, setRemoved] = useStored('removed', []);
  const [rangeMs, setRangeMs] = useStored('range', { start: null, end: null });
  const [booking, setBookingRaw] = useStored('booking', null);    // поточна оренда
  const [history, setHistory] = useStored('history', []);         // усі оплачені оренди
  const [bookedDates, setBookedDates] = useStored('booked', {});  // { toolId: [ms, …] }
  const [safetyMs, setSafetyMs] = useStored('safety', null);
  const [listings, setListings] = useStored('listings', []);      // оголошення користувача
  const [chats, setChats] = useStored('chats', {});               // { toolId: [повідомлення] }

  const range = useMemo(() => ({ start: toDate(rangeMs.start), end: toDate(rangeMs.end) }), [rangeMs]);
  const setRange = (r) => setRangeMs({ start: toMs(r.start), end: toMs(r.end) });
  const safetyAt = toDate(safetyMs);
  const setSafetyAt = (d) => setSafetyMs(toMs(d));

  // Поточна оренда й історія оновлюються разом
  const setBooking = (b) => {
    setBookingRaw(b);
    if (b) setHistory((h) => (h.some((x) => x.id === b.id) ? h.map((x) => (x.id === b.id ? b : x)) : [b, ...h]));
  };

  const value = {
    user, setUser, location, setLocation, problemId, setProblemId, removed, setRemoved,
    range, setRange, booking, setBooking, history, bookedDates, setBookedDates,
    safetyAt, setSafetyAt, listings, setListings, chats, setChats,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useBooking = () => useContext(Ctx);
