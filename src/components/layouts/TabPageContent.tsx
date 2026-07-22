import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Loader } from '@/components/loaders/Loader';

interface TabPageContentProps extends PropsWithChildren {
  isLoading: boolean;
  loadingLabel: string;
}

export function TabPageContent({ children, isLoading, loadingLabel }: TabPageContentProps) {
  return (
    <View className="flex-1">
      {children}
      {isLoading ? (
        <View className="absolute inset-0 z-10 items-center justify-center bg-background">
          <Loader label={loadingLabel} />
        </View>
      ) : null}
    </View>
  );
}
