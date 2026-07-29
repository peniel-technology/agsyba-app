import mensHeroBanner from '@/assets/images/collections/mens-hero-banner.webp';
import { CollectionHero } from '@/features/products/components/CollectionHero';

interface MensCollectionHeroProps {
  onShopPress?: () => void;
}

export function MensCollectionHero({ onShopPress }: MensCollectionHeroProps) {
  return (
    <CollectionHero
      callToActionLabel="Shop Now"
      description="Discover the latest trends in premium men's fashion."
      eyebrow="New Season"
      image={mensHeroBanner}
      imageAccessibilityLabel="Man wearing a premium tailored grey suit"
      onShopPress={onShopPress}
      title="Men’s New Season"
    />
  );
}
