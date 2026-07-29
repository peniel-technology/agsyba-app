import type { Href } from 'expo-router';

export interface BrowseCategory {
  href?: Href;
  id: string;
  image: number;
  imageAccessibilityLabel: string;
  name: string;
}
