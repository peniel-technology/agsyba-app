import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  className?: string;
}

export function Screen({ children, scroll = false, className = '' }: ScreenProps) {
  const content = scroll ? (
    <ScrollView className="flex-1" contentContainerClassName={`p-6 ${className}`}>
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 p-6 ${className}`}>{children}</View>
  );
  return <SafeAreaView className="flex-1 bg-background">{content}</SafeAreaView>;
}
