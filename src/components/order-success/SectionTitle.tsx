import { memo } from 'react';

import { Text } from '@/components/ui/Text';

interface SectionTitleProps {
  children: string;
}

export const SectionTitle = memo(function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Text className="text-sm uppercase" variant="captionStrong">
      {children}
    </Text>
  );
});
