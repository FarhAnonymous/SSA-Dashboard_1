import React from 'react';

interface OverallPerformanceProps {
    score: number;
}

export const OverallPerformance: React.FC<OverallPerformanceProps> = ({ score }) => {
    return (
        <div className="bg-white dark:bg-slate-800/50 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-0">OVERALL SUSTAINABILITY PERFORMANCE</h3>
            <div className="p-3 border-2 border-green-500 rounded-md">
                <span className="text-3xl font-bold font-mono text-green-600 dark:text-green-400">{score.toFixed(2)}</span>
            </div>
        </div>
    );
};