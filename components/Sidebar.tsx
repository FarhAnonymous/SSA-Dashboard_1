import React from 'react';
import { AssessmentIcon, CloseIcon, InsightsIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'assessment' | 'insights';
  setActiveView: (view: 'assessment' | 'insights') => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-green-100 text-green-700 font-bold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon className="h-6 w-6" />
    <span>{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeView, setActiveView }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Navigation</h2>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-2">
            <NavItem
              label="Assessment"
              icon={AssessmentIcon}
              isActive={activeView === 'assessment'}
              onClick={() => setActiveView('assessment')}
            />
            <NavItem
              label="Insights"
              icon={InsightsIcon}
              isActive={activeView === 'insights'}
              onClick={() => setActiveView('insights')}
            />
          </nav>
        </div>
      </div>
    </>
  );
};