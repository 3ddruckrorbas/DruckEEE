export interface Filament {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  material: 'PLA' | 'PETG' | 'ABS' | 'TPU' | 'Other';
  inStock: boolean;
}

export interface OrderFormData {
  projectDescription: string;
  filamentMode: 'stock' | 'custom';
  selectedFilamentId: string | null;
  customFilamentRequest: string;
  userName: string;
  userEmail: string;
  userPhone?: string; // Optional
}

export enum ViewState {
  HOME = 'HOME',
  ORDER = 'ORDER',
  SUCCESS = 'SUCCESS'
}