import { Filament } from './types';

// Diese Liste können Enrique und Jack bearbeiten, um ihren Bestand zu aktualisieren.
export const STOCK_FILAMENTS: Filament[] = [
  { id: '1', name: 'PLA Matt Schwarz', color: 'Schwarz', colorHex: '#1a1a1a', material: 'PLA', inStock: true },
  { id: '2', name: 'PLA Weiß', color: 'Weiß', colorHex: '#f5f5f5', material: 'PLA', inStock: true },
  { id: '3', name: 'PETG Signalblau', color: 'Blau', colorHex: '#2563eb', material: 'PETG', inStock: true },
  { id: '4', name: 'PLA Seidengold', color: 'Gold', colorHex: '#d4af37', material: 'PLA', inStock: true },
  { id: '5', name: 'TPU Flexibel Rot', color: 'Rot', colorHex: '#dc2626', material: 'TPU', inStock: true },
  { id: '6', name: 'PLA Galaxy Silber', color: 'Silber', colorHex: '#9ca3af', material: 'PLA', inStock: true },
  { id: '7', name: 'PETG Transparen', color: 'Klar', colorHex: '#e5e7eb', material: 'PETG', inStock: false },
];

export const EMAIL_RECIPIENT = "3d.druck.rorbas@gmail.com";
export const CUSTOM_FILAMENT_SURCHARGE = 3.00; // CHF or EUR