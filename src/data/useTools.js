import { TOOLS } from './tools.js';
import { useBooking } from '../state/BookingContext.jsx';

// Каталог: мок-оголошення + оголошення, створені користувачем
export function useTools() {
  const { listings } = useBooking();
  return [...TOOLS, ...listings];
}
