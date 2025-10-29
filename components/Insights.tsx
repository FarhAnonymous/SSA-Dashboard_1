import React, { useMemo } from 'react';
import { Calculations } from '../types';
import { tableHeaders } from '../utils/data';
import { DonutChart } from './DonutChart';
import { PerformanceScore } from './PerformanceScore';
import { CategoryBarChart } from './CategoryBarChart';

interface InsightsProps {
  productCalcs: Calculations;
  processCalcs: Calculations;
  sustainabilityIndex: {
    people: number;
    planet: number;
    profit: number;
    total: number;
  };
  overallPerformance: number;
}

export const Insights: React.FC<InsightsProps> = ({ 
  productCalcs, 
  processCalcs, 
  sustainabilityIndex, 
  overallPerformance 
}) => {
  const allCategories = useMemo(() => [
    ...tableHeaders.people.sub,
    ...tableHeaders.planet.sub,
    ...tableHeaders.profit.sub,
  ], []);

  const productChartData = useMemo(() => allCategories.map(cat => ({
    label: cat.label,
    value: productCalcs.means[cat.key] ?? 0,
  })), [allCategories, productCalcs]);

  const processChartData = useMemo(() => allCategories.map(cat => ({
    label: cat.label,
    value: processCalcs.means[cat.key] ?? 0,
  })), [allCategories, processCalcs]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-1 bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 self-start">SUSTAINABILITY INDEX</h2>
          <DonutChart data={sustainabilityIndex} />
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
           <PerformanceScore score={overallPerformance} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <CategoryBarChart title="Sustainability Index (PRODUCT)" data={productChartData} />
        </div>
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <CategoryBarChart title="Sustainability Index (PROCESS)" data={processChartData} />
        </div>
      </div>
    </div>
  );
};