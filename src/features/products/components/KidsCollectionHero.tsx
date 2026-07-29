import kidsHeroBanner from '@/assets/images/collections/kids-hero-banner.webp';
import { CollectionHero } from '@/features/products/components/CollectionHero';

interface KidsCollectionHeroProps {
  onShopPress?: () => void;
}

export function KidsCollectionHero({ onShopPress }: KidsCollectionHeroProps) {
  return (
    <CollectionHero
      callToActionLabel="Shop Now"
      description="Adorable styles and play-ready premium fashion for your little ones."
      eyebrow="New Season"
      image={kidsHeroBanner}
      imageAccessibilityLabel="Children playing together in colorful outfits at a sunny park"
      onShopPress={onShopPress}
      title="Kids' New Season"
    />
  );
}
