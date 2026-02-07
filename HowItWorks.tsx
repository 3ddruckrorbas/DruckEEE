import React from 'react';
import { ClipboardList, Settings, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">So funktioniert's</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            In drei einfachen Schritten zu deinem fertigen Objekt.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              {
                icon: <ClipboardList className="h-10 w-10" />,
                title: "1. Anfrage senden",
                desc: "Fülle unser Formular aus. Beschreibe deine Idee oder lade eine Datei hoch."
              },
              {
                icon: <Settings className="h-10 w-10" />,
                title: "2. Wir drucken",
                desc: "Enrique und Jack prüfen die Machbarkeit und starten die Drucker."
              },
              {
                icon: <Truck className="h-10 w-10" />,
                title: "3. Abholen / Versand",
                desc: "Sobald es fertig ist, informieren wir dich per E-Mail."
              }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center mb-6 shadow-xl relative group">
                  <div className="text-brand-400 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -bottom-3 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Schritt {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};