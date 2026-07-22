import { ScrollView, View } from 'react-native';

import { SearchForm } from '@/components/forms/SearchForm';
import { Screen, SidebarDrawer, TabPageContent, TopNavbar } from '@/components/layouts';
import { BrowseCategories } from '@/features/products/components/BrowseCategories';
import { CategoryOfferBanner } from '@/features/products/components/CategoryOfferBanner';
import { TrendingNow } from '@/features/products/components/TrendingNow';
import { browseCategories } from '@/features/products/constants/browseCategories';
import { trendingCategories } from '@/features/products/constants/trendingCategories';
import { useCategorySearch } from '@/features/products/hooks/useCategorySearch';
import { useTabPageLoader } from '@/hooks/useTabPageLoader';
import { useUiStore } from '@/stores/useUiStore';

export default function CategoryScreen() {
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);
  const openDrawer = useUiStore((state) => state.openDrawer);
  const { filteredCategories, setQuery } = useCategorySearch(browseCategories);
  const isPageLoading = useTabPageLoader();

  return (
    <Screen includeBottomInset={false} padded={false}>
      <TopNavbar onMenuPress={openDrawer} />
      <TabPageContent isLoading={isPageLoading} loadingLabel="Loading category page">
        <ScrollView
          className="flex-1"
          contentContainerClassName="py-4"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-4">
            <SearchForm onQueryChange={setQuery} />
          </View>
          <View className="mt-8">
            <BrowseCategories categories={filteredCategories} />
          </View>
          <View className="mt-8">
            <TrendingNow categories={trendingCategories} />
          </View>
          <View className="mt-8">
            <CategoryOfferBanner />
          </View>
        </ScrollView>
      </TabPageContent>
      <SidebarDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </Screen>
  );
}
