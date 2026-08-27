import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { ThemedModal } from '@/components/modals/ThemedModal';
import { Text } from '@/components/ui/Text';
import { routes } from '@/constants/routes';
import { ProfileAccountMenu } from '@/features/profile/components/ProfileAccountMenu';
import { ProfileHero } from '@/features/profile/components/ProfileHero';
import { ProfileInformationCard } from '@/features/profile/components/ProfileInformationCard';
import type { ProfileAccountItemId } from '@/features/profile/constants/profileData';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useThemedModal } from '@/hooks/useThemedModal';
import { useCurrentCustomer } from '@/queries/useCurrentCustomer';
import { colors } from '@/theme';

export function ProfileScreen() {
  const router = useRouter();
  const { modalProps, openModal } = useThemedModal();
  const handleLogoutPress = useLogout(openModal);
  const { data: customer, isFetching, isLoading } = useCurrentCustomer();
  const isCustomerLoading = isLoading || (!customer && isFetching);
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const handleEditPress = useCallback(() => {
    router.push(routes.editProfile);
  }, [router]);
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

      openModal({
        message: 'This account section will be available soon.',
        title: itemLabels[itemId],
        tone: 'info',
      });
    },
    [openModal, router],
  );

  if (isCustomerLoading) {
    return (
      <Screen includeBottomInset={false} padded={false}>
        <PageHeader onBackPress={handleBackPress} title="My Profile" />
        <View className="flex-1 items-center justify-center gap-3 bg-background px-6">
          <ActivityIndicator color={colors.brand} size="small" />
          <Text tone="muted" variant="caption">
            Loading your account...
          </Text>
        </View>
      </Screen>
    );
  }

  if (!customer) {
    return (
      <Screen includeBottomInset={false} padded={false}>
        <PageHeader onBackPress={handleBackPress} title="My Profile" />
        <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
          <View className="size-16 items-center justify-center rounded-full bg-sale-surface">
            <Text className="text-2xl" tone="brand" variant="title">
              ?
            </Text>
          </View>
          <View className="items-center gap-1">
            <Text className="text-center" variant="title">
              Sign in to view your account
            </Text>
            <Text className="text-center leading-5" tone="muted" variant="caption">
              Access your orders, saved items, addresses, and account details.
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Login or sign up"
            accessibilityRole="button"
            className="min-h-12 items-center justify-center rounded-sm bg-order-action px-8 py-4 active:opacity-85"
            onPress={() => router.replace(routes.login)}
          >
            <Text className="uppercase" tone="brandForeground" variant="label">
              Login / Sign up
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader onBackPress={handleBackPress} title="My Profile" />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-5 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHero customer={customer} onEditPress={handleEditPress} />

        <View className="gap-3 px-4">
          <Text className="uppercase" variant="label">
            Personal Information
          </Text>
          <ProfileInformationCard customer={customer} />
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
      <ThemedModal {...modalProps} />
    </Screen>
  );
}
