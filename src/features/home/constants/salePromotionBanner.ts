import salePromotionBannerImage from '@/assets/images/home/sale-promotion-banner.webp';
import type { PromotionBannerContent } from '@/features/home/types/promotionBanner';

export const salePromotionBanner = {
  callToActionLabel: 'Shop Sale',
  description: 'End of season sale on selected items',
  image: salePromotionBannerImage,
  imageAccessibilityLabel: 'Luxury sale collection displayed on a clothing rail',
  title: 'Up to 50% Off',
} as const satisfies PromotionBannerContent;
