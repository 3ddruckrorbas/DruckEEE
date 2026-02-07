import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { EMAIL_RECIPIENT } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rorbas 3D Druck</h3>
            <p className="mb-4 text-sm max-w-xs">
              Dein lokaler Partner für Rapid Prototyping und individuelle Geschenke. 
              Gegründet von Enrique & Jack.
            </p>
          </div>
          <div className="flex flex-col md:items-end">
             <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
             <a href={`mailto:${EMAIL_RECIPIENT}`} className="flex items-center gap-2 hover:text-brand-400 transition-colors mb-2">
               <Mail className="h-4 w-4" /> {EMAIL_RECIPIENT}
             </a>
             <div className="flex items-center gap-2">
               <MapPin className="h-4 w-4" /> Rorbas, Schweiz
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Rorbas 3D Druck. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};