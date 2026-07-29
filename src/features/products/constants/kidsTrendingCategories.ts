import activewearImage from '@/assets/images/categories/trending/kids/activewear.webp';
import babySetsImage from '@/assets/images/categories/trending/kids/baby-sets.webp';
import partyDressesImage from '@/assets/images/categories/trending/kids/party-dresses.webp';
import schoolWearImage from '@/assets/images/categories/trending/kids/school-wear.webp';
import swimwearImage from '@/assets/images/categories/trending/kids/swimwear.webp';
import type { CircularCategoryItem } from '@/types/circularCategory';

export const kidsTrendingCategories = [
  {
    id: 'party-dresses',
    image: partyDressesImage,
    imageAccessibilityLabel: 'Girl wearing a white party dress',
    name: 'Party Dresses',
  },
  {
    id: 'school-wear',
    image: schoolWearImage,
    imageAccessibilityLabel: 'Coordinated children school uniform outfit',
    name: 'School Wear',
  },
  {
    id: 'activewear',
    image: activewearImage,
    imageAccessibilityLabel: 'Children wearing colorful activewear tracksuits',
    name: 'Activewear',
  },
  {
    id: 'baby-sets',
    image: babySetsImage,
    imageAccessibilityLabel: 'Neutral folded baby clothing sets',
    name: 'Baby Sets',
  },
  {
    id: 'swimwear',
    image: swimwearImage,
    imageAccessibilityLabel: 'Children wearing colorful swimwear at the beach',
    name: 'Swimwear',
  },
] as const satisfies readonly CircularCategoryItem[];
