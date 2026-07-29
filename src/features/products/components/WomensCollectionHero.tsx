import womensHeroBanner from '@/assets/images/collections/womens-hero-banner.webp';
import { CollectionHero } from '@/features/products/components/CollectionHero';

interface WomensCollectionHeroProps {
  onShopPress?: () => void;
}

export function WomensCollectionHero({ onShopPress }: WomensCollectionHeroProps) {
  return (
    <CollectionHero
      callToActionLabel="Shop Now"
      description="Explore the latest trends in premium women's fashion."
      eyebrow="New Season"
      image={womensHeroBanner}
      imageAccessibilityLabel="Woman wearing a premium white outfit in a sunlit garden"
      onShopPress={onShopPress}
      title="Women’s New Season"
    />
  );
}
