import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { SavedCardActions } from '@/features/profile/components/SavedCardActions';
import { SavedCardVisual } from '@/features/profile/components/SavedCardVisual';
import type { SavedCard } from '@/features/profile/constants/savedCardData';

interface SavedCardItemProps {
  card: SavedCard;
  onEditPress: (card: SavedCard) => void;
  onRemovePress: (card: SavedCard) => void;
  onSetDefaultPress: (card: SavedCard) => void;
}

const styles = StyleSheet.create({
  defaultBadge: {
    borderRadius: 2,
  },
});

export function SavedCardItem({
  card,
  onEditPress,
  onRemovePress,
  onSetDefaultPress,
}: SavedCardItemProps) {
  return (
    <View className="gap-3">
      <SavedCardVisual card={card} />
      {card.isDefault ? (
        <View className="self-start bg-sale-surface px-2 py-1" style={styles.defaultBadge}>
          <Text className="uppercase font-manrope-bold" tone="orderAction" variant="micro">
            Default
          </Text>
        </View>
      ) : null}
      <SavedCardActions
        isDefault={card.isDefault}
        onEditPress={() => onEditPress(card)}
        onRemovePress={() => onRemovePress(card)}
        onSetDefaultPress={() => onSetDefaultPress(card)}
      />
    </View>
  );
}
