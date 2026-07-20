import autumnLuxeImage from '@/assets/images/home/autumn-luxe.webp';
import eveningEleganceImage from '@/assets/images/home/evening-elegance.webp';
import resortWearImage from '@/assets/images/home/resort-wear.webp';
import summerCollectionImage from '@/assets/images/home/summer-collection.webp';
import type { HeroSlide } from '@/features/home/types';

export const heroSlides = [
  {
    id: 'summer-collection',
    eyebrow: 'New Arrival',
    title: 'Summer\nCollection 2025',
    callToActionLabel: 'Shop Now',
    image: summerCollectionImage,
    imageAccessibilityLabel: 'Two women wearing neutral summer tailoring beside a pool',
  },
  {
    id: 'evening-elegance',
    eyebrow: 'Trending Now',
    title: 'Evening\nElegance 2025',
    callToActionLabel: 'Shop Now',
    image: eveningEleganceImage,
    imageAccessibilityLabel: 'Woman wearing an evening gown overlooking the sea at sunset',
  },
  {
    id: 'resort-wear',
    eyebrow: 'Exclusive',
    title: 'Resort\nWear Edit',
    callToActionLabel: 'Shop Now',
    image: resortWearImage,
    imageAccessibilityLabel: 'Woman wearing a cream resort outfit in a tropical garden',
  },
  {
    id: 'autumn-luxe',
    eyebrow: 'New Season',
    title: 'Autumn\nLuxe Styles',
    callToActionLabel: 'Shop Now',
    image: autumnLuxeImage,
    imageAccessibilityLabel: 'Woman wearing a camel coat and scarf in the city',
  },
] as const satisfies readonly HeroSlide[];
