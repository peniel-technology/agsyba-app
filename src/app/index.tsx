import { ScrollView, View } from 'react-native';

import { Screen, TopNavbar } from '@/components/layouts';
import { HeroCarousel } from '@/features/home/components/HeroCarousel';
import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import { ShoppingBenefits } from '@/features/home/components/ShoppingBenefits';
import { heroSlides } from '@/features/home/constants/heroSlides';
import { shopCategories } from '@/features/home/constants/shopCategories';
import { shoppingBenefits } from '@/features/home/constants/shoppingBenefits';

export default function HomeScreen() {
  return (
    <Screen padded={false}>
      <TopNavbar />
      <ScrollView className="flex-1" contentContainerClassName="py-4">
        <HeroCarousel slides={heroSlides} />
        <View className="mt-4">
          <ShoppingBenefits benefits={shoppingBenefits} />
        </View>
        <View className="mt-8">
          <ShopByCategory categories={shopCategories} />
        </View>
      </ScrollView>
    </Screen>
  );
}
