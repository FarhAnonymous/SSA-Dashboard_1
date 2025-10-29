import React from 'react';

const legendItems = [
    { label: 'Negative impact High', value: 0, color: 'bg-red-300' },
    { label: 'Negative impact Medium', value: 1, color: 'bg-red-200' },
    { label: 'Negative impact Low', value: 2, color: 'bg-amber-200' },
    { label: 'Neutral', value: 3, color: 'bg-slate-200' },
    { label: 'Positive impact Low', value: 4, color: 'bg-green-200' },
    { label: 'Positive impact Medium', value: 5, color: 'bg-green-300' },
    { label: 'Positive impact High', value: 6, color: 'bg-green-400' },
];

export const Legend: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Legend</h3>
            </div>
            <div>
                {legendItems.map((item, index) => (
                    <div
                        key={item.value}
                        className={`flex items-center justify-between p-3 ${index < legendItems.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                    >
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{item.label}</span>
                        <span className={`w-8 h-6 flex items-center justify-center rounded text-lg font-bold text-slate-800 ${item.color}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};