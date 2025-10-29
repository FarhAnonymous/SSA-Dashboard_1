import React from 'react';
import { SectionData, Section, Category, SubCategoryKey, Calculations } from '../types';
import { DataTable } from './DataTable';
import { SustainabilityIndex } from './SustainabilityIndex';
import { OverallPerformance } from './OverallPerformance';
import { Legend } from './Legend';
import { tableHeaders } from '../utils/data';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-base font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-900
      ${isActive
        ? 'bg-green-600 text-white shadow'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
      }`}
  >
    {label}
  </button>
);

interface DashboardProps {
  productData: SectionData;
  processData: SectionData;
  onValueChange: (section: Section, rowIndex: number, catKey: SubCategoryKey, value: number) => void;
  productCalcs: Calculations;
  processCalcs: Calculations;
  sustainabilityIndex: { people: number; planet: number; profit: number; total: number; };
  overallPerformance: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  productData, 
  processData, 
  onValueChange,
  productCalcs,
  processCalcs,
  sustainabilityIndex,
  overallPerformance
}) => {
  const [activeTab, setActiveTab] = React.useState<Category>('people');

  return (
    <div className="space-y-6">
       <div className="bg-white dark:bg-slate-800/50 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex justify-center space-x-2">
        <TabButton label="People" isActive={activeTab === 'people'} onClick={() => setActiveTab('people')} />
        <TabButton label="Planet" isActive={activeTab === 'planet'} onClick={() => setActiveTab('planet')} />
        <TabButton label="Profit" isActive={activeTab === 'profit'} onClick={() => setActiveTab('profit')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/50 shadow-lg rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-700">
            <DataTable
            title="PRODUCT"
            data={productData}
            calcs={productCalcs}
            headers={tableHeaders}
            activeTab={activeTab}
            onValueChange={(rowIndex, catKey, value) => onValueChange('product', rowIndex, catKey, value)}
            />
        </div>
        <div className="bg-white dark:bg-slate-800/50 shadow-lg rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-700">
            <DataTable
            title="PROCESS (Method)"
            data={processData}
            calcs={processCalcs}
            headers={tableHeaders}
            activeTab={activeTab}
            onValueChange={(rowIndex, catKey, value) => onValueChange('process', rowIndex, catKey, value)}
            />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <SustainabilityIndex data={sustainabilityIndex} />
          <OverallPerformance score={overallPerformance} />
        </div>
        <Legend />
      </div>
    </div>
  );
};