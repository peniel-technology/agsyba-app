import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export interface ContactIconButtonProps {
  accessibilityLabel: string;
  icon: ReactNode;
  onPress?: () => void;
}

export function ContactIconButton({ accessibilityLabel, icon, onPress }: ContactIconButtonProps) {
  if (!onPress) {
    return (
      <View
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        className="size-9 items-center justify-center rounded-2xl bg-stone-900"
      >
        {icon}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: false }}
      className="size-9 items-center justify-center rounded-2xl bg-stone-900 active:opacity-90"
      hitSlop={8}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}
