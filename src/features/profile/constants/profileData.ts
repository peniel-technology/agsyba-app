export const profileData = {
  dateOfBirth: 'March 15, 1992',
  email: 'sarahlawson@email.com',
  firstName: 'Sarah',
  gender: 'Female',
  lastName: 'Lawson',
  memberSince: 'Member since Jul 2023',
  phone: '+1 (555) 234-5678',
  displayName: 'Sarah Lawson',
} as const;

export const profileAccountItems = [
  { id: 'orders', label: 'Orders & Returns' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'saved-cards', label: 'Saved Cards' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'coupons', label: 'Coupons & Offers' },
  { id: 'gift-cards', label: 'Gift Cards' },
  { id: 'notifications', label: 'Notifications' },
] as const;

export type ProfileAccountItemId = (typeof profileAccountItems)[number]['id'];
