import { TOOLS } from './tools.js';

// Каталог побутових задач (історія 5.1)
export const PROBLEMS = [
  { id: 'tv', title: 'Повісити телевізор', kinds: ['Дриль', 'Рівень', 'Детектор проводки'] },
  { id: 'shelf', title: 'Повісити полицю', kinds: ['Дриль', 'Рівень'] },
  { id: 'furniture', title: 'Зібрати меблі', kinds: ['Шуруповерт'] },
  { id: 'clog', title: 'Прочистити засмічення', kinds: ['Сантехнічний трос'] },
];

export const KIT_RADIUS = 10;

// Оголошення для підбору (тестові дані зі сценаріїв Gherkin історії 5.1)
const byId = (id) => TOOLS.find((t) => t.id === id);
export const KIT_LISTINGS = [
  { ...byId('drill'), kind: 'Дриль' },
  { id: 'drill-makita', name: 'Дриль Makita', kind: 'Дриль', price: 90, km: 2.1, owner: 'Сергій' },
  { id: 'level', name: 'Рівень лазерний', kind: 'Рівень', price: 30, km: 1.2, owner: 'Ірина' },
  { id: 'detector', name: 'Детектор Bosch GMS', kind: 'Детектор проводки', price: 50, km: 3.4, owner: 'Олена' },
  { ...byId('screw'), kind: 'Шуруповерт' },
  { id: 'cable', name: 'Трос сантехнічний 5 м', kind: 'Сантехнічний трос', price: 40, km: 12.0, owner: 'Василь' },
];

// Для кожного типу береться найближче оголошення в радіусі 10 км
export function buildKit(problem) {
  return problem.kinds.map((kind) => {
    const tool = KIT_LISTINGS
      .filter((l) => l.kind === kind && l.km <= KIT_RADIUS)
      .sort((a, b) => a.km - b.km)[0];
    return { kind, tool: tool || null };
  });
}
