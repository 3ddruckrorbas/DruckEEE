import React from 'react';
import { Printer, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="p-2 bg-brand-500/10 rounded-lg group-hover:bg-brand-500/20 transition-colors">
              <Printer className="h-6 w-6 text-brand-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Rorbas<span className="text-brand-400">3D</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => onNavigate(ViewState.HOME)}
                className={`${currentView === ViewState.HOME ? 'text-white' : 'text-slate-400'} hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate(ViewState.ORDER)}
                className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-brand-500/20"
              >
                Jetzt Drucken
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => { onNavigate(ViewState.HOME); setIsOpen(false); }}
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate(ViewState.ORDER); setIsOpen(false); }}
              className="bg-brand-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Jetzt starten
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};