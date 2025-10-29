
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Insights } from './components/Insights';
import { SustainabilityIcon, MenuIcon } from './components/icons';
import { SectionData, Section, SubCategoryKey } from './types';
import { initialData, tableHeaders } from './utils/data';
import { performCalculations } from './utils/calculations';


const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'assessment' | 'insights'>('assessment');
  
  const [productData, setProductData] = useState<SectionData>(initialData.product);
  const [processData, setProcessData] = useState<SectionData>(initialData.process);

  const handleValueChange = useCallback((section: Section, rowIndex: number, catKey: SubCategoryKey, value: number) => {
      const parsedValue = isNaN(value) ? 0 : value;
      const setData = section === 'product' ? setProductData : setProcessData;

      setData(prevData => {
        return prevData.map((row, rIdx) => {
          if (rIdx !== rowIndex) return row;
          
          const updatedRow = { ...row };
          let updated = false;

          // Update People
          updatedRow.people = row.people.map(p => {
              if (p.key === catKey) {
                  updated = true;
                  return { ...p, value: parsedValue };
              }
              return p;
          });
          if (updated) return updatedRow;

          // Update Planet
          updatedRow.planet = row.planet.map(p => {
              if (p.key === catKey) {
                  updated = true;
                  return { ...p, value: parsedValue };
              }
              return p;
          });
          if (updated) return updatedRow;
          
          // Update Profit
          updatedRow.profit = row.profit.map(p => {
              if (p.key === catKey) {
                  updated = true;
                  return { ...p, value: parsedValue };
              }
              return p;
          });
          
          return updatedRow;
        });
      });
    }, []);
    
  // --- Lifted Calculations ---
  const productCalcs = useMemo(() => performCalculations(productData, tableHeaders), [productData]);
  const processCalcs = useMemo(() => performCalculations(processData, tableHeaders), [processData]);

  const sustainabilityIndex = useMemo(() => {
    const people = (productCalcs.indexMeans.people + processCalcs.indexMeans.people) / 2;
    const planet = (productCalcs.indexMeans.planet + processCalcs.indexMeans.planet) / 2;
    const profit = (productCalcs.indexMeans.profit + processCalcs.indexMeans.profit) / 2;
    const total = people + planet + profit;
    return { people, planet, profit, total };
  }, [productCalcs, processCalcs]);
  
  const overallPerformance = useMemo(() => {
    const pIM = productCalcs.indexMeans;
    const rIM = processCalcs.indexMeans;
    
    const sumOfIndexMeans = 
        pIM.people + pIM.planet + pIM.profit +
        rIM.people + rIM.planet + rIM.profit;

    // The overall performance is the average of the six pillar index means.
    return sumOfIndexMeans / 6;
  }, [productCalcs, processCalcs]);
  // --- End of Lifted Calculations ---

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const handleViewChange = (view: 'assessment' | 'insights') => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 font-sans animate-background-pan [background-size:200%_200%]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} activeView={activeView} setActiveView={handleViewChange} />
      
      <div>
        <header className={`w-full sticky top-0 z-30 transition-all duration-300 ease-in-out ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent dark:bg-transparent'}`}>
          <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${scrolled ? 'py-3' : 'py-4'} flex items-center gap-3`}>
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <MenuIcon className="h-6 w-6 text-slate-800 dark:text-slate-200" />
              </button>
              <SustainabilityIcon className={`transition-all duration-300 ease-in-out text-green-500 animate-subtle-float animate-pulse-glow ${scrolled ? 'h-8 w-8' : 'h-10 w-10'}`} />
              <div>
                <h1 className={`tracking-tight font-bold text-black dark:text-white transition-all duration-300 ease-in-out ${scrolled ? 'text-2xl' : 'text-2xl sm:text-3xl'}`}>
                  Social Sustainability Assessment 1.0
                </h1>
                <p className={`text-slate-600 dark:text-slate-400 transition-all duration-300 ease-in-out overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-8 opacity-100 mt-1'}`}>
                  Interactive dashboard for assessing sustainability across People, Planet, and Profit dimensions
                </p>
              </div>
          </div>
        </header>
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeView === 'assessment' ? (
             <Dashboard 
              productData={productData}
              processData={processData}
              onValueChange={handleValueChange}
              productCalcs={productCalcs}
              processCalcs={processCalcs}
              sustainabilityIndex={sustainabilityIndex}
              overallPerformance={overallPerformance}
             />
          ) : (
            <Insights 
              productCalcs={productCalcs} 
              processCalcs={processCalcs}
              sustainabilityIndex={sustainabilityIndex}
              overallPerformance={overallPerformance}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;