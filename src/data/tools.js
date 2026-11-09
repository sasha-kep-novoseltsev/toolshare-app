// Мок-дані: інструменти поруч (відстань у км від адреси орендаря)
export const WORK_TYPES = ['Свердління', 'Різання', 'Садові роботи'];
export const RADII = [1, 3, 5, 10];

export const TOOLS = [
  { id: 'drill', name: 'Дриль Bosch', type: 'Свердління', price: 120, km: 0.8, owner: 'Олена', ownerF: true, rentals: 23, rating: 4.9 },
  { id: 'hammer', name: 'Перфоратор Makita', type: 'Свердління', price: 150, km: 4.2, owner: 'Ігор', ownerF: false, rentals: 9, rating: 4.7 },
  { id: 'screw', name: 'Шуруповерт DeWalt', type: 'Свердління', price: 70, km: 7.5, owner: 'Тарас', ownerF: false, rentals: 14, rating: 4.8 },
  { id: 'grinder', name: 'Болгарка', type: 'Різання', price: 100, km: 1.5, owner: 'Марина', ownerF: true, rentals: 11, rating: 4.6 },
  { id: 'mower', name: 'Газонокосарка', type: 'Садові роботи', price: 130, km: 3.0, owner: 'Андрій', ownerF: false, rentals: 6, rating: 4.5 },
];

// Демо-дата як у критеріях приймання ЛР3
export const TODAY = new Date(2026, 9, 10);
// Дати, заброньовані іншими орендарями (для всіх інструментів у демо)
export const BASE_BOOKED = [15, 16, 17].map((d) => new Date(2026, 9, d).getTime());
