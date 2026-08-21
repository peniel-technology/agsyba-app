export type SavedCardBrand = 'mastercard' | 'visa';
export type SavedCardGradient = 'dark' | 'gold';

export interface SavedCard {
  brand: SavedCardBrand;
  expires: string;
  gradient: SavedCardGradient;
  holder: string;
  id: string;
  isDefault: boolean;
  lastFour: string;
}

export const initialSavedCards: readonly SavedCard[] = [
  {
    brand: 'visa',
    expires: '03/26',
    gradient: 'dark',
    holder: 'Sarah Lawson',
    id: 'saved-card-visa-5678',
    isDefault: true,
    lastFour: '5678',
  },
  {
    brand: 'mastercard',
    expires: '09/25',
    gradient: 'gold',
    holder: 'Sarah Lawson',
    id: 'saved-card-mastercard-4892',
    isDefault: false,
    lastFour: '4892',
  },
];
