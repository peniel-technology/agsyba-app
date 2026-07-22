import promotionBannerImage from '@/assets/images/home/promo-banner.webp';
import type { PromotionBannerContent } from '@/features/home/types/promotionBanner';

export const promotionBanner = {
  callToActionLabel: 'Shop Now',
  description: 'Explore our curated collection of statement pieces',
  image: promotionBannerImage,
  imageAccessibilityLabel: 'Curated collection of statement dresses',
  title: 'Glam Your Daily Look',
} as const satisfies PromotionBannerContent;
