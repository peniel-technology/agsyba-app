import { Camera, X } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { Text } from '@/components/ui/Text';
import type { ReviewPhoto } from '@/features/reviews/constants/ratingReviewData';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReviewPhotoUploaderProps {
  onAddPress: () => void;
  onRemovePress: (photoId: string) => void;
  photos: readonly ReviewPhoto[];
}

const styles = StyleSheet.create({
  dropzone: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  photo: {
    height: 80,
    width: 80,
  },
  removeButton: {
    right: 4,
    top: 4,
  },
});

export function ReviewPhotoUploader({
  onAddPress,
  onRemovePress,
  photos,
}: ReviewPhotoUploaderProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text variant="title">Add Photos (Optional)</Text>
        <Text tone="muted" variant="caption">
          {photos.length}/5
        </Text>
      </View>

      <Pressable
        accessibilityLabel="Add photos"
        accessibilityRole="button"
        className="items-center justify-center gap-2 px-4 py-5 active:bg-subtle-surface"
        onPress={onAddPress}
        style={styles.dropzone}
      >
        <Camera
          accessible={false}
          color={colors.muted}
          size={iconSizes.large}
          strokeWidth={iconStrokeWidths.regular}
        />
        <Text tone="muted" variant="captionMedium">
          Click to upload or drag &amp; drop
        </Text>
        <Text tone="muted" variant="micro">
          PNG, JPG up to 5MB (Max 5 photos)
        </Text>
      </Pressable>

      {photos.length > 0 ? (
        <View className="flex-row gap-3">
          {photos.map((photo) => (
            <View className="relative overflow-hidden rounded-sm" key={photo.id}>
              <Image
                accessibilityLabel={photo.accessibilityLabel}
                contentFit="cover"
                source={photo.image}
                style={styles.photo}
              />
              <Pressable
                accessibilityLabel={`Remove ${photo.accessibilityLabel}`}
                accessibilityRole="button"
                className="absolute size-6 items-center justify-center rounded-full bg-black/65 active:opacity-70"
                onPress={() => onRemovePress(photo.id)}
                style={styles.removeButton}
              >
                <X
                  accessible={false}
                  color={colors.surface}
                  size={iconSizes.compact}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
