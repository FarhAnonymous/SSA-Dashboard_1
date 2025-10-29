import { SectionData } from '../types';

export const tableHeaders = {
  people: {
    label: 'PEOPLE',
    sub: [
      { label: 'Labor Practices & Decent work', key: 'labor' },
      { label: 'Human Rights', key: 'humanRights' },
      { label: 'Society & Customers', key: 'society' },
      { label: 'Ethical behaviour', key: 'ethical' },
    ],
  },
  planet: {
    label: 'PLANET',
    sub: [
      { label: 'Materials and Procurement', key: 'materials' },
      { label: 'Energy', key: 'energy' },
      { label: 'Water', key: 'water' },
      { label: 'Transport', key: 'transport' },
      { label: 'Waste', key: 'waste' },
    ],
  },
  profit: {
    label: 'PROFIT',
    sub: [
      { label: 'ROI', key: 'roi' },
      { label: 'Economic Stimulation', key: 'economic' },
      { label: 'Business Agility', key: 'business' },
    ],
  },
};

const createRow = (name: string, p: number[], pl: number[], pr: number[]): any => ({
  name,
  people: tableHeaders.people.sub.map((s, i) => ({ ...s, value: p[i] })),
  planet: tableHeaders.planet.sub.map((s, i) => ({ ...s, value: pl[i] })),
  profit: tableHeaders.profit.sub.map((s, i) => ({ ...s, value: pr[i] })),
});

const productData: SectionData = [
  createRow('Environment', [5, 5, 5, 4], [5, 5, 5, 4, 5], [4, 4, 5]),
  createRow('Safety',      [6, 5, 6, 5], [6, 6, 6, 4, 6], [4, 4, 4]),
  createRow('Health',      [5, 5, 5, 5], [5, 5, 5, 3, 5], [4, 4, 5]),
  createRow('Lifespan',    [4, 4, 5, 5], [5, 4, 4, 4, 4], [5, 4, 5]),
  createRow('Dual-Focus',  [4, 4, 4, 4], [4, 4, 4, 3, 4], [5, 4, 4]),
];

const processData: SectionData = [
  createRow('Environment',     [5, 4, 5, 4], [5, 5, 5, 5, 5], [5, 4, 4]),
  createRow('Safety',          [6, 4, 6, 5], [6, 5, 5, 4, 5], [5, 4, 4]),
  createRow('Health',          [6, 5, 6, 5], [6, 5, 5, 5, 5], [4, 4, 5]),
  createRow('Work-In-Process', [5, 4, 5, 4], [5, 5, 4, 4, 5], [5, 4, 4]),
];

export const initialData = {
  product: productData,
  process: processData,
};