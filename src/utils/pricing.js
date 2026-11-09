// Розрахунок вартості за тарифами історії 5.2
export const DAY = 24 * 60 * 60 * 1000;
export const MAX_DAYS = 14;
export const HORIZON_DAYS = 90;

const round2 = (v) => Math.round(v * 100 + Number.EPSILON) / 100;

export function daysBetween(start, end) {
  return Math.round((end - start) / DAY) + 1; // включно з першим і останнім днем
}

// Повертає вартість одного інструмента та назву застосованого тарифу
export function rentalCost(price, start, days) {
  if (days === 2 && start.getDay() === 6) return { sum: round2(price * 1.5), tariff: 'Вихідні' };
  const weeks = Math.floor(days / 7);
  const rest = days % 7;
  const restCost = Math.min(rest * price, price * 5);
  const capped = rest * price > price * 5;
  let tariff = 'Доба';
  if (weeks && rest) tariff = 'Тиждень + Доба';
  else if (weeks) tariff = 'Тиждень';
  else if (capped) tariff = 'Тиждень';
  return { sum: round2(weeks * price * 5 + restCost), tariff };
}

export const deposit = (dayTotal) => round2(dayTotal * 3);
