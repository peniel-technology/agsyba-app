import { Camera } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';

interface ReturnEvidenceUploadProps {
  onPress: () => void;
}

const styles = StyleSheet.create({
  dropzone: {
    borderColor: colors.neutral500,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
});

export function ReturnEvidenceUpload({ onPress }: ReturnEvidenceUploadProps) {
  return (
    <Pressable
      accessibilityLabel="Add photos or videos as evidence"
      accessibilityRole="button"
      className="self-stretch items-center justify-center gap-1 py-4 active:bg-subtle-surface"
      onPress={onPress}
      style={styles.dropzone}
    >
      <Camera
        accessible={false}
        color={colors.neutral500}
        size={iconSizes.large}
        strokeWidth={iconStrokeWidths.standard}
      />
      <Text tone="muted" variant="captionMedium">
        Add photos or videos
      </Text>
    </Pressable>
  );
}
