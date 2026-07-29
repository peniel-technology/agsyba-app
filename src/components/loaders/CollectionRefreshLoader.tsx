import { View } from 'react-native';

import { Loader } from '@/components/loaders/Loader';

interface CollectionRefreshLoaderProps {
  isVisible: boolean;
  label: string;
}

export function CollectionRefreshLoader({ isVisible, label }: CollectionRefreshLoaderProps) {
  return isVisible ? (
    <View className="absolute inset-x-0 top-0 z-20 items-center bg-surface/95" pointerEvents="none">
      <Loader label={label} />
    </View>
  ) : null;
}
