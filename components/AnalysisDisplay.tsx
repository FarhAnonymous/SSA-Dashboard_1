
import React from 'react';

interface AnalysisDisplayProps {
  analysis: string;
  fileName: string;
  onReset: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, fileName, onReset }) => {
  // Simple markdown-to-html logic for display
  const formattedAnalysis = analysis
    .split('\n')
    .map(line => {
        if (line.startsWith('### ')) return `<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">${line.substring(4)}</h3>`;
        if (line.startsWith('## ')) return `<h2 class="text-xl font-bold mt-6 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-gray-100">${line.substring(3)}</h2>`;
        if (line.startsWith('# ')) return `<h1 class="text-2xl font-extrabold mt-4 mb-4 text-gray-900 dark:text-white">${line.substring(2)}</h1>`;
        if (line.startsWith('* ')) return `<li class="ml-5 list-disc">${line.substring(2)}</li>`;
        if (line.trim() === '') return '<br />';
        return `<p class="mb-2">${line}</p>`;
    })
    .join('');

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Report</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">File: {fileName}</p>
        </div>
        <button
          onClick={onReset}
          className="mt-4 sm:mt-0 bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
        >
          Analyze Another File
        </button>
      </div>
      
      <div 
        className="prose prose-green dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: formattedAnalysis }}
      />
    </div>
  );
};
