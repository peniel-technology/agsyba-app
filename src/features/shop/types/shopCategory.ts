import type { Href } from 'expo-router';

export interface ShopCategory {
  href: Href;
  id: string;
  image: number;
  imageAccessibilityLabel: string;
  name: string;
}
