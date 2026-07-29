import footwearHeroBanner from '@/assets/images/collections/footwear-hero-banner.webp';
import { CollectionHero } from '@/features/products/components/CollectionHero';

interface FootwearCollectionHeroProps {
  onShopPress?: () => void;
}

export function FootwearCollectionHero({ onShopPress }: FootwearCollectionHeroProps) {
  return (
    <CollectionHero
      callToActionLabel="Shop Now"
      description="Premium footwear engineered for ultimate comfort and unmatched style."
      eyebrow="Step Into Style"
      image={footwearHeroBanner}
      imageAccessibilityLabel="Colorful athletic shoes displayed on illuminated platforms"
      onShopPress={onShopPress}
      title="Step Into Style"
    />
  );
}
