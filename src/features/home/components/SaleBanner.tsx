import { PromotionalBanner } from '@/features/home/components/PromotionalBanner';
import type { PromotionBannerContent } from '@/features/home/types/promotionBanner';

interface SaleBannerProps {
  content: PromotionBannerContent;
  onPress?: () => void;
}

export function SaleBanner({ content, onPress }: SaleBannerProps) {
  return <PromotionalBanner content={content} onPress={onPress} variant="sale" />;
}
