import React from 'react';
import { ArrowRight, Box, Zap, Heart } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../types';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Jetzt Anfragen offen
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Deine Ideen. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">
              Dreidimensional realisiert.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
            Willkommen bei Rorbas 3D Druck. Wir sind Enrique und Jack – deine lokalen Experten für personalisierte 3D-Drucke. Von Prototypen bis zu einzigartigen Geschenken, wir machen es möglich.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={onStart} size="lg" className="w-full sm:w-auto gap-2">
              Projekt Starten <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth'})}>
              Wie es funktioniert
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Box className="h-8 w-8 text-brand-400" />,
              title: "Individuell",
              desc: "Jedes Teil wird genau nach deinen Wünschen und Maßen gefertigt."
            },
            {
              icon: <Zap className="h-8 w-8 text-brand-400" />,
              title: "Schnell & Lokal",
              desc: "Direkt aus Rorbas. Keine langen Lieferwege, direkter Kontakt."
            },
            {
              icon: <Heart className="h-8 w-8 text-brand-400" />,
              title: "Leidenschaft",
              desc: "Gedruckt von Enthusiasten (Enrique & Jack), die Qualität lieben."
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-brand-500/30 transition-all hover:-translate-y-1">
              <div className="p-3 bg-slate-900 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};