import React from 'react';
import { SectionData, Calculations, SubCategoryKey, Category } from '../types';
import { EditableCell } from './EditableCell';

interface DataTableProps {
  title: string;
  data: SectionData;
  calcs: Calculations;
  headers: any;
  activeTab: Category;
  onValueChange: (rowIndex: number, catKey: SubCategoryKey, value: number) => void;
}

const CalculatedRow: React.FC<{ label: string, values: (number | null)[], isBold?: boolean, isDotted?: boolean, decimalPlaces?: number }> = ({ label, values, isBold, isDotted, decimalPlaces = 2 }) => (
  <tr className={`${isBold ? 'font-bold' : ''} bg-slate-50 dark:bg-slate-700/50 border-b border-slate-300 dark:border-slate-600`}>
    <td className={`p-2 text-center italic text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-600 ${isDotted ? 'border-t border-dashed border-slate-400 dark:border-slate-500' : ''}`}>{label}</td>
    {values.map((val, i) => (
      <td key={i} className={`p-2 text-center font-bold text-black dark:text-white border-l border-slate-300 dark:border-slate-600 ${isDotted ? 'border-t border-dashed border-slate-400 dark:border-slate-500' : ''}`}>{typeof val === 'number' ? val.toFixed(decimalPlaces) : ''}</td>
    ))}
  </tr>
);

export const DataTable: React.FC<DataTableProps> = ({ title, data, calcs, headers, activeTab, onValueChange }) => {
  const subCategoriesForTab = headers[activeTab].sub;
  
  const getValuesForCalculatedRow = (source: 'means' | 'maxes' | 'mins') => {
    return subCategoriesForTab.map((sub: any) => calcs[source][sub.key]);
  }

  return (
    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400 border-collapse">
      <thead className="text-sm text-white uppercase">
        <tr>
          <th scope="col" className="p-4 font-bold bg-green-600 dark:bg-green-700 text-white w-40 border-r border-green-500 dark:border-green-600">{title}</th>
          {subCategoriesForTab.map((sub: any, i: number) => (
            <th key={i} scope="col" className="p-4 text-center font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 break-words border-l border-slate-300 dark:border-slate-600">
              {sub.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-white dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600">
            <td className="p-2 font-bold text-black dark:text-white break-words w-40 border-r border-slate-300 dark:border-slate-600 bg-amber-50 dark:bg-amber-900/20">{row.name}</td>
            {row[activeTab].map(cell => (
              <EditableCell 
                key={cell.key} 
                value={cell.value}
                onChange={(newValue) => onValueChange(rowIndex, cell.key, newValue)}
              />
            ))}
          </tr>
        ))}
        <CalculatedRow label="Criteria Mean" values={getValuesForCalculatedRow('means')} isBold isDotted decimalPlaces={1} />
        <CalculatedRow label="Max" values={getValuesForCalculatedRow('maxes')} isBold decimalPlaces={0} />
        <CalculatedRow label="Min" values={getValuesForCalculatedRow('mins')} isBold decimalPlaces={0} />
        
        <tr className="font-bold bg-slate-50 dark:bg-slate-700/50">
          <td className="p-2 text-center italic text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-600">Index Mean</td>
          <td colSpan={subCategoriesForTab.length} className="p-2 text-center text-black dark:text-white border-l border-slate-300 dark:border-slate-600">{calcs.indexMeans[activeTab].toFixed(2)}</td>
        </tr>
        <tr className="font-bold bg-slate-50 dark:bg-slate-700/50">
          <td className="p-2 text-center italic text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-600">Normalised Mean</td>
          <td colSpan={subCategoriesForTab.length} className="p-2 text-center text-black dark:text-white border-l border-slate-300 dark:border-slate-600">{calcs.normalisedMeans[activeTab].toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};