import { memo } from 'react';
import { View } from 'react-native';
import { colors } from '@/theme';

export const TimelineConnector = memo(function TimelineConnector() {
  return (
    <View
      style={{
        width: 1,
        height: 34,
        marginBottom: -16,
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
        borderStyle: 'dashed',
      }}
    />
  );
});
