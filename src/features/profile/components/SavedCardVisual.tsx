import { LinearGradient } from 'expo-linear-gradient';
import { Cpu } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import type { SavedCard } from '@/features/profile/constants/savedCardData';
import { colors, gradients } from '@/theme';

interface SavedCardVisualProps {
  card: SavedCard;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    height: 176,
    overflow: 'hidden',
  },
  chip: {
    height: 24,
    width: 32,
  },
  mastercardGold: {
    backgroundColor: colors.cardMastercardGold,
    borderRadius: 10,
    height: 20,
    marginLeft: -5,
    opacity: 0.9,
    width: 20,
  },
  mastercardRed: {
    backgroundColor: colors.cardMastercardRed,
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  visaBadge: {
    backgroundColor: colors.cardVisa,
    borderRadius: 2,
  },
});

export function SavedCardVisual({ card }: SavedCardVisualProps) {
  const gradientColors =
    card.gradient === 'dark' ? gradients.savedCardDark : gradients.savedCardGold;

  return (
    <LinearGradient colors={gradientColors} style={styles.card}>
      <View className="flex-1 justify-between p-6">
        <View className="flex-row items-center justify-between">
          <Cpu color={colors.cardChip} size={24} strokeWidth={1.25} style={styles.chip} />
          {card.brand === 'visa' ? (
            <View className="px-2.5 py-1" style={styles.visaBadge}>
              <Text
                className="font-manrope-extrabold"
                tone="brandForeground"
                variant="captionStrong"
              >
                VISA
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <View style={styles.mastercardRed} />
              <View style={styles.mastercardGold} />
            </View>
          )}
        </View>

        <Text className="font-manrope-semibold" tone="brandForeground" variant="title">
          •••• •••• •••• {card.lastFour}
        </Text>

        <View className="flex-row items-end justify-between">
          <View className="gap-0.5">
            <Text className="uppercase opacity-60" tone="brandForeground" variant="micro">
              Card Holder
            </Text>
            <Text tone="brandForeground" variant="captionStrong">
              {card.holder}
            </Text>
          </View>
          <View className="items-end gap-0.5">
            <Text className="uppercase opacity-60" tone="brandForeground" variant="micro">
              Expires
            </Text>
            <Text tone="brandForeground" variant="captionStrong">
              {card.expires}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
