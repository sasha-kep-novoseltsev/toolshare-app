import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppScreen from '../components/AppScreen.jsx';
import Button from '../components/ui/Button.jsx';
import { useTools } from '../data/useTools.js';
import { useBooking } from '../state/BookingContext.jsx';

const SEED = [
  { mine: true, text: 'Добрий день! Інструмент вільний з 12 по 14 жовтня?', time: '10:02' },
  { mine: false, text: 'Добрий день! Так, вільний. Додам свердла 6 і 8 мм.', time: '10:05' },
];
const REPLIES = [
  'Добре, домовились!',
  'Точну адресу надішлю після бронювання.',
  'Можу передати інструмент після 18:00.',
];
const now = () => new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

export default function ChatScreen() {
  const { toolId = 'drill' } = useParams();
  const tools = useTools();
  const tool = tools.find((t) => t.id === toolId && !t.mine) || tools[0];
  const { chats, setChats } = useBooking();
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  const messages = chats[tool.id] || SEED;

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length, typing]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const next = [...messages, { mine: true, text: t, time: now() }];
    setChats({ ...chats, [tool.id]: next });
    setText('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = REPLIES[next.filter((m) => m.mine).length % REPLIES.length];
      setChats((c) => ({ ...c, [tool.id]: [...(c[tool.id] || next), { mine: false, text: reply, time: now() }] }));
    }, 1200);
  };

  return (
    <AppScreen nav="Чат">
      <Link to={`/tool/${tool.id}`} className="text-sm font-bold text-brand">Назад · {tool.name}</Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-semibold leading-[1.2]">{tool.owner}</h1>
        <p className="text-xs text-muted">{tool.ownerF ? 'Власниця' : 'Власник'} · {tool.name} · зазвичай відповідає за 10 хв</p>
      </div>
      <div className="flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-1 ${m.mine ? 'items-end' : 'items-start'}`}>
            <p className={`max-w-[260px] rounded-2xl px-4 py-3 text-xs ${m.mine ? 'bg-tint' : 'border border-line-off bg-surface'}`}>{m.text}</p>
            <span className="text-xs text-muted">{m.time}</span>
          </div>
        ))}
        {typing && <span className="text-xs text-muted">{tool.owner} друкує…</span>}
        <span ref={end} />
      </div>
      <form className="mt-auto flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Повідомлення"
          className="h-12 min-w-0 flex-1 rounded-ui border border-line bg-surface px-4 text-sm text-ink outline-none placeholder:text-off focus:border-btn" />
        <Button type="submit" disabled={!text.trim()} className="px-4">Надіслати</Button>
      </form>
    </AppScreen>
  );
}
