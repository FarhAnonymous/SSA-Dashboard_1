import React from 'react';

interface PerformanceScoreProps {
    score: number;
}

export const PerformanceScore: React.FC<PerformanceScoreProps> = ({ score }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                <span className="text-green-500 text-3xl">✓</span> SUSTAINABILITY PERFORMANCE
            </h3>
            <div className="bg-green-300 dark:bg-green-400 p-4 rounded-lg shadow-inner">
                <span className="text-5xl font-extrabold font-mono text-green-900">{score.toFixed(2)}</span>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-semibold">Scale: 0 - 6</p>
        </div>
    );
};
