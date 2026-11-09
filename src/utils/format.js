export const km = (v) => v.toFixed(1).replace('.', ',') + ' км';
export const uah = (v) => v + ' грн';
export const rating = (v) => v.toFixed(1).replace('.', ',');

// Тарифи: доба P, вихідні 1,5×P, тиждень 5×P, застава 3×P
export function tariffs(p) {
  return { day: p, weekend: Math.round(p * 1.5), week: p * 5, deposit: p * 3 };
}
