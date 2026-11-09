import { useLocation } from 'react-router-dom';
import PhoneFrame from './PhoneFrame.jsx';
import BottomNav from './BottomNav.jsx';
import TopBar from './TopBar.jsx';

// Екран: шапка, прокручуваний вміст з анімацією появи і (за потреби) нижня навігація
export default function AppScreen({ nav, children }) {
  const { pathname } = useLocation();
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <TopBar />
        <div key={pathname} className="animate-screen stagger flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {children}
        </div>
        {nav && <BottomNav active={nav} />}
      </div>
    </PhoneFrame>
  );
}
