import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { ViewState } from './types';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);

  const handleStartOrder = () => {
    setView(ViewState.ORDER);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = () => {
    setView(ViewState.SUCCESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar currentView={view} onNavigate={setView} />
      
      <main className="flex-grow pt-16">
        {view === ViewState.HOME && (
          <div className="animate-fadeIn">
            <Hero onStart={handleStartOrder} />
            <HowItWorks />
          </div>
        )}

        {view === ViewState.ORDER && (
          <div className="animate-slideUp">
            <OrderForm 
              onCancel={() => setView(ViewState.HOME)} 
              onSubmitSuccess={handleOrderSuccess}
            />
          </div>
        )}

        {view === ViewState.SUCCESS && (
          <div className="min-h-[60vh] flex items-center justify-center px-4 animate-scaleIn">
            <div className="text-center max-w-lg mx-auto p-8 rounded-2xl bg-slate-800/50 border border-brand-500/30">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">E-Mail App geöffnet!</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Wir haben dein E-Mail-Programm mit allen Details geöffnet. Bitte drücke dort nur noch auf <strong>"Senden"</strong>, damit die Anfrage bei Enrique und Jack ankommt.
              </p>
              <div className="flex flex-col gap-3">
                 <Button onClick={() => setView(ViewState.HOME)} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Zurück zur Startseite
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;