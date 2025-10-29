import React from 'react';

interface SustainabilityIndexProps {
  data: {
    people: number;
    planet: number;
    profit: number;
    total: number;
  };
}

const IndexRow: React.FC<{ label: string; value: number; percentage: number }> = ({ label, value, percentage }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <div className="flex items-center gap-4">
            <span className="w-16 text-right font-mono text-lg">{value.toFixed(2)}</span>
            <span className="w-20 text-right font-mono text-lg text-green-600 dark:text-green-400">
                {(percentage * 100).toFixed(1)}%
            </span>
        </div>
    </div>
);


export const SustainabilityIndex: React.FC<SustainabilityIndexProps> = ({ data }) => {
  const { people, planet, profit, total } = data;
  const getPercentage = (value: number) => (total > 0 ? value / total : 0);

  return (
    <div className="bg-white dark:bg-slate-800/50 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">SUSTAINABILITY INDEX</h3>
      <div className="space-y-1">
        <IndexRow label="PEOPLE" value={people} percentage={getPercentage(people)} />
        <IndexRow label="PLANET" value={planet} percentage={getPercentage(planet)} />
        <IndexRow label="PROFIT" value={profit} percentage={getPercentage(profit)} />
      </div>
    </div>
  );
};