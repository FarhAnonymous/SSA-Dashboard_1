import { SectionData, Calculations, Category } from '../types';

const getColumnValues = (data: SectionData, key: string): number[] => {
  const values: number[] = [];
  data.forEach(row => {
    const allCategories = [...row.people, ...row.planet, ...row.profit];
    const category = allCategories.find(c => c.key === key);
    if (category) {
      values.push(category.value);
    }
  });
  return values.filter(v => typeof v === 'number' && !isNaN(v));
};

const calculateMean = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
};

const calculateMax = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return Math.max(...arr);
};

const calculateMin = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return Math.min(...arr);
};

export const performCalculations = (data: SectionData, headers: any): Calculations => {
  const means: { [key: string]: number } = {};
  const maxes: { [key: string]: number } = {};
  const mins: { [key: string]: number } = {};

  const allSubCategories = [
    ...headers.people.sub,
    ...headers.planet.sub,
    ...headers.profit.sub,
  ];

  allSubCategories.forEach(sub => {
    const values = getColumnValues(data, sub.key);
    means[sub.key] = calculateMean(values);
    maxes[sub.key] = calculateMax(values);
    mins[sub.key] = calculateMin(values);
  });

  const getCategoryMeans = (category: Category) => headers[category].sub.map((s: any) => means[s.key]);

  const indexMeans = {
    people: calculateMean(getCategoryMeans('people')),
    planet: calculateMean(getCategoryMeans('planet')),
    profit: calculateMean(getCategoryMeans('profit')),
  };

  const getCategoryDataValues = (category: Category): number[] => {
    const values: number[] = [];
    data.forEach(row => {
      row[category].forEach(cat => {
        values.push(cat.value);
      });
    });
    return values.filter(v => typeof v === 'number' && !isNaN(v));
  };

  const calculateNormalisedMean = (indexMean: number, values: number[]): number => {
    if (values.length === 0) return 0;
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max === min) return 0; // Avoid division by zero
    return (indexMean - min) / (max - min);
  };
  
  const normalisedMeans = {
    people: calculateNormalisedMean(indexMeans.people, getCategoryDataValues('people')),
    planet: calculateNormalisedMean(indexMeans.planet, getCategoryDataValues('planet')),
    profit: calculateNormalisedMean(indexMeans.profit, getCategoryDataValues('profit')),
  };

  return { means, maxes, mins, indexMeans, normalisedMeans };
};