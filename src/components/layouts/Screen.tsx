import type { PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  padded?: boolean;
  className?: string;
  includeBottomInset?: boolean;
}

const fullScreenEdges = ['top', 'right', 'bottom', 'left'] as const satisfies readonly Edge[];
const topScreenEdges = ['top', 'right', 'left'] as const satisfies readonly Edge[];

export function Screen({
  children,
  scroll = false,
  padded = true,
  className = '',
  includeBottomInset = true,
}: ScreenProps) {
  const paddingClassName = padded ? 'p-6' : '';
  const content = scroll ? (
    <ScrollView className="flex-1" contentContainerClassName={`${paddingClassName} ${className}`}>
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 ${paddingClassName} ${className}`}>{children}</View>
  );
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={includeBottomInset ? fullScreenEdges : topScreenEdges}
    >
      {content}
    </SafeAreaView>
  );
}
