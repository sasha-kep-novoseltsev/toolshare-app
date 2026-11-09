import { PROBLEMS, buildKit } from '../data/problems.js';
import { daysBetween, rentalCost, deposit } from './pricing.js';

const round2 = (v) => Math.round(v * 100 + Number.EPSILON) / 100;
export const COMMISSION = 0.1;

// Розрахунок бронювання: інструменти, оренда, застава, комісія
export function quote(problemId, removed, range) {
  const problem = PROBLEMS.find((p) => p.id === problemId);
  if (!problem || !range.start) return null;
  const end = range.end || range.start;
  const days = daysBetween(range.start, end);
  const tools = buildKit(problem).filter((k) => k.tool && !removed.includes(k.tool.id)).map((k) => k.tool);
  const rows = tools.map((t) => ({ tool: t, ...rentalCost(t.price, range.start, days) }));
  const rent = round2(rows.reduce((s, r) => s + r.sum, 0));
  const dep = deposit(tools.reduce((s, t) => s + t.price, 0));
  const commission = round2(rent * COMMISSION);
  return { problem, tools, rows, days, start: range.start, end, rent, deposit: dep, total: round2(rent + dep), commission, payout: round2(rent - commission) };
}

export const fmtDate = (d) => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
export const fmtPeriod = (q) => (q.days === 1 ? fmtDate(q.start) : `${fmtDate(q.start)}–${fmtDate(q.end)}`);
