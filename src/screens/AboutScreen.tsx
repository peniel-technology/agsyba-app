import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { AboutHeroSection } from '@/components/about/AboutHeroSection';
import { AboutCoreValuesSection } from '@/components/about/AboutCoreValuesSection';
import { AboutMissionSection } from '@/components/about/AboutMissionSection';
import { AboutStatsSection } from '@/components/about/AboutStatsSection';
import { AboutStorySection } from '@/components/about/AboutStorySection';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { aboutPageData } from '@/data/about';
import { useCartStore } from '@/stores/useCartStore';
export default function AboutScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.itemCount);
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <ShoppingBagHeader itemCount={cartItemCount} onBackPress={handleBackPress} title="About Us" />
      <ScrollView className="bg-background" contentContainerClassName="pb-6">
        <AboutHeroSection {...aboutPageData.hero} />
        <AboutStorySection {...aboutPageData.story} />
        <AboutStatsSection stats={aboutPageData.stats} />
        <AboutCoreValuesSection
          title={aboutPageData.coreValuesTitle}
          values={aboutPageData.coreValues}
        />
        <AboutMissionSection {...aboutPageData.mission} />
      </ScrollView>
    </Screen>
  );
}
