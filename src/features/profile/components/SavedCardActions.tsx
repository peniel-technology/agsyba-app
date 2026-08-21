import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface SavedCardActionsProps {
  isDefault: boolean;
  onEditPress: () => void;
  onRemovePress: () => void;
  onSetDefaultPress: () => void;
}

function ActionLink({
  disabled = false,
  label,
  onPress,
}: {
  disabled?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className="active:opacity-70"
      disabled={disabled}
      onPress={onPress}
    >
      <Text tone={disabled ? 'muted' : 'orderAction'} variant="captionStrong">
        {label}
      </Text>
    </Pressable>
  );
}

export function SavedCardActions({
  isDefault,
  onEditPress,
  onRemovePress,
  onSetDefaultPress,
}: SavedCardActionsProps) {
  return (
    <View className="flex-row items-center gap-3 pt-1">
      <ActionLink label="Edit card" onPress={onEditPress} />
      <Text tone="muted" variant="caption">
        |
      </Text>
      <ActionLink label="Remove card" onPress={onRemovePress} />
      <Text tone="muted" variant="caption">
        |
      </Text>
      <ActionLink disabled={isDefault} label="Set as default" onPress={onSetDefaultPress} />
    </View>
  );
}
