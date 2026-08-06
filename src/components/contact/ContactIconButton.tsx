import { Pressable } from 'react-native';
import { type ReactNode } from 'react';

export interface ContactIconButtonProps {
  icon: ReactNode;
  onPress?: () => void;
}

export function ContactIconButton({ icon, onPress }: ContactIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      className="size-9 items-center justify-center rounded-2xl bg-stone-900 active:opacity-90"
      disabled={!onPress}
      hitSlop={8}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}
