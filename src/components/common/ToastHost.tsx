import { CircleAlert, CircleCheck, Info, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, motion, spacing } from '@/theme';
import { type ToastTone, useToastStore } from '@/stores/useToastStore';

function getToastIcon(tone: ToastTone) {
  if (tone === 'error') {
    return CircleAlert;
  }

  if (tone === 'success') {
    return CircleCheck;
  }

  return Info;
}

function getToastIconColor(tone: ToastTone) {
  if (tone === 'error') {
    return colors.error;
  }

  if (tone === 'success') {
    return colors.success;
  }

  return colors.primary;
}

function getToastAccentClassName(tone: ToastTone) {
  if (tone === 'error') {
    return 'bg-error';
  }

  if (tone === 'success') {
    return 'bg-success';
  }

  return 'bg-primary';
}

function getToastIconBackgroundClassName(tone: ToastTone) {
  if (tone === 'error') {
    return 'bg-sale-surface';
  }

  if (tone === 'success') {
    return 'bg-success-surface';
  }

  return 'bg-primary/10';
}

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const hideToast = useToastStore((state) => state.hideToast);
  const toast = useToastStore((state) => state.toast);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = setTimeout(hideToast, toast.durationMs);

    return () => clearTimeout(timeoutId);
  }, [hideToast, toast]);

  if (!toast) {
    return null;
  }

  const Icon = getToastIcon(toast.tone);
  const iconColor = getToastIconColor(toast.tone);

  return (
    <View className="absolute inset-0 z-50" pointerEvents="box-none">
      <View
        className="flex-1 justify-end px-4"
        pointerEvents="box-none"
        style={{ paddingBottom: Math.max(insets.bottom + spacing[3], spacing[6]) }}
      >
        <Animated.View
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          entering={FadeInDown.duration(motion.toastTransitionMs)}
          exiting={FadeOutUp.duration(motion.toastTransitionMs)}
          key={toast.id}
        >
          <View className="flex-row">
            <View className={`w-1 ${getToastAccentClassName(toast.tone)}`} />
            <View className="min-h-20 flex-1 flex-row items-start gap-3 p-4">
              <View
                className={`size-10 items-center justify-center rounded-full ${getToastIconBackgroundClassName(toast.tone)}`}
              >
                <Icon
                  accessible={false}
                  color={iconColor}
                  size={iconSizes.medium}
                  strokeWidth={iconStrokeWidths.emphasized}
                />
              </View>

              <View className="flex-1 pt-0.5">
                <Text
                  tone={
                    toast.tone === 'error'
                      ? 'error'
                      : toast.tone === 'success'
                        ? 'success'
                        : 'primary'
                  }
                  variant="bodyStrong"
                >
                  {toast.title}
                </Text>
                <Text className="mt-1 leading-5" tone="muted" variant="detail">
                  {toast.message}
                </Text>
              </View>

              <Pressable
                accessibilityLabel={`Dismiss ${toast.title}`}
                accessibilityRole="button"
                className="size-8 items-center justify-center rounded-full active:bg-subtle-surface"
                hitSlop={spacing[1]}
                onPress={hideToast}
              >
                <X
                  accessible={false}
                  color={colors.muted}
                  size={iconSizes.compact}
                  strokeWidth={iconStrokeWidths.regular}
                />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
