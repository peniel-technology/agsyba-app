import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { motion } from '@/theme';

interface LoaderDotProps {
  delayMs: number;
}

function LoaderDot({ delayMs }: LoaderDotProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, { duration: motion.loaderDotPulseMs }),
          withTiming(0, { duration: motion.loaderDotPulseMs }),
        ),
        -1,
      ),
    );

    return () => cancelAnimation(progress);
  }, [delayMs, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + progress.value * 0.6,
    transform: [{ scale: 0.75 + progress.value * 0.25 }],
  }));

  return (
    <Animated.View
      accessible={false}
      className="size-2 rounded-full bg-brand"
      style={animatedStyle}
      testID="loader-dot"
    />
  );
}

interface LoaderProps {
  label?: string;
}

const loaderDotDelays = [0, motion.loaderDotStaggerMs, motion.loaderDotStaggerMs * 2] as const;

export function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      className="flex-row items-center justify-center gap-2 p-6"
    >
      {loaderDotDelays.map((delayMs) => (
        <LoaderDot delayMs={delayMs} key={delayMs} />
      ))}
    </View>
  );
}
