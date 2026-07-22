import casualLookImage from '@/assets/images/styles/casual-look.webp';
import officeLookImage from '@/assets/images/styles/office-look.webp';
import partyLookImage from '@/assets/images/styles/party-look.webp';
import vacationLookImage from '@/assets/images/styles/vacation-look.webp';
import type { StyleCategory } from '@/features/home/types/styleCategory';

export const styleCategories = [
  {
    callToActionLabel: 'Shop Now',
    id: 'office-look',
    image: officeLookImage,
    imageAccessibilityLabel: 'Woman wearing a neutral tailored office suit',
    name: 'Office Look',
  },
  {
    callToActionLabel: 'Shop Now',
    id: 'casual-look',
    image: casualLookImage,
    imageAccessibilityLabel: 'Woman wearing a casual outfit on a city street',
    name: 'Casual Look',
  },
  {
    callToActionLabel: 'Shop Now',
    id: 'party-look',
    image: partyLookImage,
    imageAccessibilityLabel: 'Woman wearing an elegant black evening dress',
    name: 'Party Look',
  },
  {
    callToActionLabel: 'Shop Now',
    id: 'vacation-look',
    image: vacationLookImage,
    imageAccessibilityLabel: 'Woman wearing a white vacation outfit by the beach',
    name: 'Vacation Look',
  },
] as const satisfies readonly StyleCategory[];
