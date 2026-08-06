import { memo } from 'react';
import { View } from 'react-native';
import { colors } from '@/theme';

interface TimelineDotProps {
  isCompleted: boolean;
}

export const TimelineDot = memo(function TimelineDot({ isCompleted }: TimelineDotProps) {
  if (isCompleted) {
    return (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.success,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.border,
      }}
    />
  );
});
