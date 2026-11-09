import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './state/BookingContext.jsx';
import AuthScreen from './screens/AuthScreen.jsx';
import SearchScreen from './screens/SearchScreen.jsx';
import ToolScreen from './screens/ToolScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import PickerScreen from './screens/PickerScreen.jsx';
import KitScreen from './screens/KitScreen.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import SafetyScreen from './screens/SafetyScreen.jsx';
import ActScreen from './screens/ActScreen.jsx';
import NewListingScreen from './screens/NewListingScreen.jsx';
import BookingsScreen from './screens/BookingsScreen.jsx';

export default function App() {
  return (
    <BookingProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/tool/:id" element={<ToolScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/chat/:toolId" element={<ChatScreen />} />
          <Route path="/picker" element={<PickerScreen />} />
          <Route path="/kit/:problemId" element={<KitScreen />} />
          <Route path="/calendar/:problemId" element={<CalendarScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/safety" element={<SafetyScreen />} />
          <Route path="/act" element={<ActScreen />} />
          <Route path="/new" element={<NewListingScreen />} />
          <Route path="/bookings" element={<BookingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </BookingProvider>
  );
}
