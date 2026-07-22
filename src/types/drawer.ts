import type { LucideIcon } from 'lucide-react-native';

export type DrawerItemId =
  | 'sale'
  | 'men'
  | 'women'
  | 'kids'
  | 'footwear'
  | 'new-arrivals'
  | 'trending'
  | 'brands'
  | 'wishlist'
  | 'orders'
  | 'account'
  | 'notifications'
  | 'country'
  | 'currency'
  | 'about'
  | 'contact'
  | 'help'
  | 'logout';

export interface DrawerMenuItemConfig {
  badge?: string;
  disclosure?: 'expand' | 'navigate';
  dividerBefore?: boolean;
  icon?: LucideIcon;
  id: DrawerItemId;
  inset?: boolean;
  label: string;
  tone?: 'brand' | 'default' | 'muted';
  value?: string;
}
