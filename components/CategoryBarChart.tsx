import React from 'react';

interface BarChartProps {
  title: string;
  data: { label: string; value: number }[];
}

const MAX_SCORE = 6;

export const CategoryBarChart: React.FC<BarChartProps> = ({ title, data }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">{title}</h3>
      <div className="flex items-end space-x-1 h-64 border-b-2 border-l-2 border-slate-300 dark:border-slate-600 pb-1 pl-1">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full relative group">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform group-hover:scale-100 scale-95 origin-bottom">
              <p className="font-bold">{item.label.replace(/ & /g, ' & ')}</p>
              <p>Index: <span className="font-semibold">{item.value.toFixed(2)}</span></p>
              {/* Triangle pointer */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-[4px] border-t-slate-800"></div>
            </div>

            {/* Bar */}
            <div 
              className="w-full bg-green-500 dark:bg-green-600 rounded-t-sm group-hover:bg-green-400 dark:group-hover:bg-green-500 transition-all duration-200"
              style={{ height: `${(item.value / MAX_SCORE) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-1 mt-1">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 h-16 flex items-start justify-center break-words leading-tight pt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};