import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { ProfileAccountMenu } from '@/features/profile/components/ProfileAccountMenu';
import { ProfileHero } from '@/features/profile/components/ProfileHero';
import { ProfileInformationCard } from '@/features/profile/components/ProfileInformationCard';
import type { ProfileAccountItemId } from '@/features/profile/constants/profileData';

export function ProfileScreen() {
  const router = useRouter();
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const handleEditPress = useCallback(() => {
    Alert.alert('Edit Profile', 'Profile editing will be available soon.');
  }, []);
  const handleAccountItemPress = useCallback(
    (itemId: ProfileAccountItemId) => {
      if (itemId === 'wishlist') {
        router.push({ params: { returnTo: routes.profile }, pathname: routes.wishlist });
        return;
      }

      if (itemId === 'addresses') {
        router.push({ params: { returnTo: routes.profile }, pathname: routes.deliveryAddress });
        return;
      }

      if (itemId === 'orders') {
        router.push(routes.ordersReturns);
        return;
      }

      if (itemId === 'notifications') {
        router.push({ params: { returnTo: routes.profile }, pathname: routes.notifications });
        return;
      }

      if (itemId === 'coupons') {
        router.push({ params: { returnTo: routes.profile }, pathname: routes.couponsOffers });
        return;
      }

      if (itemId === 'saved-cards') {
        router.push({ params: { returnTo: routes.profile }, pathname: routes.savedCards });
        return;
      }

      const itemLabels: Record<
        Exclude<
          ProfileAccountItemId,
          'addresses' | 'coupons' | 'orders' | 'saved-cards' | 'wishlist'
        >,
        string
      > = {
        'gift-cards': 'Gift Cards',
        notifications: 'Notifications',
      };

      Alert.alert(itemLabels[itemId], 'This account section will be available soon.');
    },
    [router],
  );
  const handleLogoutPress = useCallback(() => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { style: 'cancel', text: 'Cancel' },
      { style: 'destructive', text: 'Log Out' },
    ]);
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="My Profile" />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-5 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHero onEditPress={handleEditPress} />

        <View className="gap-3 px-4">
          <Text className="uppercase" variant="label">
            Personal Information
          </Text>
          <ProfileInformationCard />
        </View>

        <View className="gap-3 px-4">
          <Text className="uppercase" variant="label">
            My Stuff &amp; Account
          </Text>
          <ProfileAccountMenu onItemPress={handleAccountItemPress} />
        </View>

        <View className="items-center px-4 pt-1">
          <Pressable
            accessibilityLabel="Log out"
            accessibilityRole="button"
            className="rounded-md border border-brand px-6 py-3 active:bg-sale-surface"
            onPress={handleLogoutPress}
          >
            <Text className="uppercase" tone="brand" variant="label">
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
