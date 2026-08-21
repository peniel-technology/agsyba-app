import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { PageHeader, Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { SavedCardForm } from '@/features/profile/components/SavedCardForm';
import { SavedCardItem } from '@/features/profile/components/SavedCardItem';
import { initialSavedCards, type SavedCard } from '@/features/profile/constants/savedCardData';
import type { SavedCardFormValues } from '@/features/profile/schemas/savedCardSchema';

export function SavedCardsScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [cards, setCards] = useState<readonly SavedCard[]>(initialSavedCards);

  const handleBackPress = useCallback(() => {
    router.replace(routes.profile);
  }, [router]);

  const handleAddCardPress = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleEditPress = useCallback((card: SavedCard) => {
    Alert.alert('Edit Card', `Editing card ending in ${card.lastFour} will be available soon.`);
  }, []);

  const handleRemovePress = useCallback((card: SavedCard) => {
    Alert.alert('Remove Card', `Remove the card ending in ${card.lastFour}?`, [
      { style: 'cancel', text: 'Cancel' },
      {
        onPress: () => {
          setCards((currentCards) => {
            const remainingCards = currentCards.filter((item) => item.id !== card.id);

            if (remainingCards.length > 0 && !remainingCards.some((item) => item.isDefault)) {
              return remainingCards.map((item, index) => ({ ...item, isDefault: index === 0 }));
            }

            return remainingCards;
          });
        },
        style: 'destructive',
        text: 'Remove',
      },
    ]);
  }, []);

  const handleSetDefaultPress = useCallback((card: SavedCard) => {
    setCards((currentCards) =>
      currentCards.map((item) => ({ ...item, isDefault: item.id === card.id })),
    );
  }, []);

  const handleSaveCard = useCallback((values: SavedCardFormValues) => {
    const cardNumber = values.cardNumber.replace(/\s/g, '');
    const isVisa = cardNumber.startsWith('4');
    const newCard: SavedCard = {
      brand: isVisa ? 'visa' : 'mastercard',
      expires: values.expiry.replace(/\s/g, ''),
      gradient: isVisa ? 'dark' : 'gold',
      holder: values.cardHolderName.trim(),
      id: `saved-card-${Date.now()}`,
      isDefault: false,
      lastFour: cardNumber.slice(-4),
    };

    setCards((currentCards) => [...currentCards, newCard]);
    Alert.alert('Card Saved', `Card ending in ${newCard.lastFour} was saved.`);
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <PageHeader
        onBackPress={handleBackPress}
        onRightActionPress={handleAddCardPress}
        rightActionLabel="+ Add Card"
        title="Saved Cards"
      />
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-6 p-6 pb-10"
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
      >
        {cards.map((card) => (
          <SavedCardItem
            card={card}
            key={card.id}
            onEditPress={handleEditPress}
            onRemovePress={handleRemovePress}
            onSetDefaultPress={handleSetDefaultPress}
          />
        ))}

        <View className="h-px bg-subtle-border" />
        <SavedCardForm onSubmit={handleSaveCard} />
      </ScrollView>
    </Screen>
  );
}
