import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Package, Sparkles, Info, X } from 'lucide-react';
import { STOCK_FILAMENTS, EMAIL_RECIPIENT, CUSTOM_FILAMENT_SURCHARGE } from '../constants';
import { OrderFormData, ViewState } from '../types';
import { Button } from './Button';

interface OrderFormProps {
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onCancel, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    projectDescription: '',
    filamentMode: 'stock',
    selectedFilamentId: null,
    customFilamentRequest: '',
    userName: '',
    userEmail: '',
    userPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMaterialInfo, setShowMaterialInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email body
    const selectedStock = STOCK_FILAMENTS.find(f => f.id === formData.selectedFilamentId);
    
    const filamentText = formData.filamentMode === 'stock' && selectedStock
      ? `Lager-Filament: ${selectedStock.name} (${selectedStock.material})`
      : `Spezialwunsch (+${CUSTOM_FILAMENT_SURCHARGE} CHF): ${formData.customFilamentRequest}`;

    const subject = `Neue 3D-Druck Anfrage von ${formData.userName}`;
    const body = `
Hallo Enrique und Jack,

Ich habe eine neue Anfrage für einen 3D-Druck:

--- PROJEKT ---
${formData.projectDescription}

--- MATERIAL ---
${filamentText}

--- KONTAKT ---
Name: ${formData.userName}
Email: ${formData.userEmail}
Telefon: ${formData.userPhone || 'Nicht angegeben'}

Bitte meldet euch bei mir!
    `.trim();

    // Simulate network request nicely
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Try to open mail client
    window.location.href = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsSubmitting(false);
    onSubmitSuccess();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-700 bg-slate-800/80">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-brand-400" />
            Projekt Anfrage
          </h2>
          <p className="text-slate-400 mt-2">
            Beschreibe uns dein Projekt. Enrique oder Jack melden sich so schnell wie möglich bei dir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* SECTION 1: Description */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              1. Was möchtest du drucken?
            </label>
            <div className="relative">
              <textarea
                required
                rows={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                placeholder="Beschreibe dein Objekt, füge Links zu STL-Dateien (z.B. Thingiverse) hinzu oder erkläre deine Idee..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
              />
            </div>
          </div>

          {/* SECTION 2: Material Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              2. Material & Farbe auswählen
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setFormData({...formData, filamentMode: 'stock', customFilamentRequest: ''})}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.filamentMode === 'stock' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.filamentMode === 'stock' ? 'border-brand-500' : 'border-slate-500'}`}>
                    {formData.filamentMode === 'stock' && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full" />}
                  </div>
                  <span className="font-semibold text-white">Lagerbestand</span>
                </div>
                <p className="text-sm text-slate-400 ml-8">Wähle aus unseren vorhandenen Filamenten. Keine Zusatzkosten.</p>
              </div>

              <div 
                onClick={() => setFormData({...formData, filamentMode: 'custom', selectedFilamentId: null})}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.filamentMode === 'custom' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
              >
                 <div className="flex items-center gap-3 mb-2">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.filamentMode === 'custom' ? 'border-brand-500' : 'border-slate-500'}`}>
                    {formData.filamentMode === 'custom' && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full" />}
                  </div>
                  <span className="font-semibold text-white">Spezialwunsch</span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded ml-auto">
                    +{CUSTOM_FILAMENT_SURCHARGE} CHF
                  </span>
                </div>
                <p className="text-sm text-slate-400 ml-8">Wir bestellen eine Farbe/Material extra für dich.</p>
              </div>
            </div>

            {/* Sub-selection for Stock */}
            {formData.filamentMode === 'stock' && (
              <div className="animate-fadeIn mt-6">
                
                {/* Info Button Section */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setShowMaterialInfo(!showMaterialInfo)}
                    className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-2 transition-colors focus:outline-none"
                  >
                    <Info className="h-4 w-4" />
                    {showMaterialInfo ? 'Infos ausblenden' : 'Welches Material passt zu mir? (Infos)'}
                  </button>

                  {showMaterialInfo && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700 animate-fadeIn relative">
                      <button 
                        type="button"
                        onClick={() => setShowMaterialInfo(false)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                        <h4 className="font-bold text-white mb-1">PLA</h4>
                        <p className="text-xs text-brand-400 font-mono mb-2">Der Standard</p>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          <li>Perfekt für Deko & Figuren</li>
                          <li>Einfach zu drucken</li>
                          <li>Biologisch abbaubar</li>
                          <li className="text-slate-500">Nicht hitzebeständig (&lt;50°C)</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                        <h4 className="font-bold text-white mb-1">PETG</h4>
                        <p className="text-xs text-brand-400 font-mono mb-2">Der Allrounder</p>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          <li>Robust & stabil</li>
                          <li>Witterungsbeständig</li>
                          <li>Leicht flexibel</li>
                          <li>Gut für mechanische Teile</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                        <h4 className="font-bold text-white mb-1">TPU</h4>
                        <p className="text-xs text-brand-400 font-mono mb-2">Flexibel</p>
                        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                          <li>Gummiartig & weich</li>
                          <li>Unzerbrechlich</li>
                          <li>Stoßdämpfend</li>
                          <li>Für Handyhüllen, Dichtungen</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Verfügbare Filamente
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {STOCK_FILAMENTS.map(filament => (
                    <button
                      type="button"
                      key={filament.id}
                      disabled={!filament.inStock}
                      onClick={() => setFormData({...formData, selectedFilamentId: filament.id})}
                      className={`relative p-3 rounded-lg border text-left transition-all group ${
                        formData.selectedFilamentId === filament.id 
                          ? 'border-brand-500 ring-1 ring-brand-500 bg-slate-800' 
                          : 'border-slate-700 bg-slate-900 hover:border-slate-500'
                      } ${!filament.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-slate-600 shadow-sm" 
                          style={{backgroundColor: filament.colorHex}} 
                        />
                        {filament.material === 'TPU' && <span className="text-[10px] font-bold bg-slate-700 px-1 rounded text-slate-300">FLEX</span>}
                      </div>
                      <div className="text-sm font-medium text-white truncate">{filament.name}</div>
                      <div className="text-xs text-slate-500">{filament.color}</div>
                      {!filament.inStock && (
                        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center rounded-lg backdrop-blur-[1px]">
                          <span className="text-xs font-bold text-red-400 transform -rotate-12 border border-red-400 px-2 py-1 rounded">Ausverkauft</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-selection for Custom */}
            {formData.filamentMode === 'custom' && (
              <div className="mt-4 animate-fadeIn">
                 <textarea
                  required
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Welche Farbe oder welches Material brauchst du? (z.B. Neon Grün PLA, Carbon Fiber PETG...)"
                  value={formData.customFilamentRequest}
                  onChange={(e) => setFormData({...formData, customFilamentRequest: e.target.value})}
                />
                <div className="flex items-start gap-2 mt-2 text-amber-400 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>Bei Spezialbestellungen fällt eine einmalige Gebühr von {CUSTOM_FILAMENT_SURCHARGE} CHF an. Die Lieferzeit kann sich um 1-2 Wochen verlängern.</p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: Contact Info */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              3. Deine Kontaktdaten
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Dein Name"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">E-Mail</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="deine@email.com"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-500 mb-1">Telefon (Optional)</label>
                <input
                  type="tel"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="+41 79 ..."
                  value={formData.userPhone}
                  onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center gap-4 justify-end">
            <Button type="button" variant="ghost" onClick={onCancel} className="w-full sm:w-auto">
              Abbrechen
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || (formData.filamentMode === 'stock' && !formData.selectedFilamentId)}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird vorbereitet...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Anfrage Absenden <Send className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};