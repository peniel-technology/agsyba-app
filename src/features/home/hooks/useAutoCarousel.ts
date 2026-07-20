import { useCallback, useEffect, useRef } from 'react';
import type { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { AppState } from 'react-native';
import {
  cancelAnimation,
  Easing,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface UseAutoCarouselOptions {
  intervalMs: number;
  itemCount: number;
  snapInterval: number;
  transitionDurationMs: number;
}

interface NextLoopPosition {
  activeIndex: number;
  shouldResetAfterTransition: boolean;
  targetIndex: number;
}

export function getNextLoopPosition(activeIndex: number, itemCount: number): NextLoopPosition {
  const normalizedActiveIndex = activeIndex >= itemCount ? 0 : activeIndex;
  const targetIndex = normalizedActiveIndex + 1;
  const shouldResetAfterTransition = itemCount > 1 && targetIndex === itemCount;

  return {
    activeIndex: shouldResetAfterTransition ? 0 : targetIndex,
    shouldResetAfterTransition,
    targetIndex,
  };
}

export function useAutoCarousel<TItem>({
  intervalMs,
  itemCount,
  snapInterval,
  transitionDurationMs,
}: UseAutoCarouselOptions) {
  const carouselRef = useAnimatedRef<FlatList<TItem>>();
  const scrollOffset = useSharedValue(0);
  const reduceMotion = useReducedMotion();
  const activeIndexRef = useRef(0);
  const isInteractingRef = useRef(false);
  const isAppActiveRef = useRef(
    AppState.currentState !== 'background' && AppState.currentState !== 'inactive',
  );

  useAnimatedReaction(
    () => scrollOffset.value,
    (currentOffset) => {
      scrollTo(carouselRef, currentOffset, 0, false);
    },
  );

  const animateToIndex = useCallback(
    (targetIndex: number, shouldResetAfterTransition: boolean) => {
      const targetOffset = targetIndex * snapInterval;
      cancelAnimation(scrollOffset);

      if (reduceMotion || transitionDurationMs <= 0) {
        scrollOffset.value = shouldResetAfterTransition ? 0 : targetOffset;
        return;
      }

      scrollOffset.value = withTiming(
        targetOffset,
        {
          duration: transitionDurationMs,
          easing: Easing.inOut(Easing.cubic),
        },
        (finished) => {
          if (finished && shouldResetAfterTransition) {
            scrollOffset.value = 0;
          }
        },
      );
    },
    [reduceMotion, scrollOffset, snapInterval, transitionDurationMs],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      isAppActiveRef.current = nextState === 'active';
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (itemCount <= 1 || snapInterval <= 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      if (isInteractingRef.current || !isAppActiveRef.current) {
        return;
      }

      const nextPosition = getNextLoopPosition(activeIndexRef.current, itemCount);
      activeIndexRef.current = nextPosition.activeIndex;
      animateToIndex(nextPosition.targetIndex, nextPosition.shouldResetAfterTransition);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [animateToIndex, intervalMs, itemCount, snapInterval]);

  const syncActiveIndex = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / snapInterval);
      activeIndexRef.current = Math.min(Math.max(nextIndex, 0), itemCount);

      return activeIndexRef.current;
    },
    [itemCount, snapInterval],
  );

  const resetLoopPosition = useCallback(() => {
    cancelAnimation(scrollOffset);
    activeIndexRef.current = 0;
    scrollOffset.value = 0;
  }, [scrollOffset]);

  const handleScrollBeginDrag = useCallback(() => {
    cancelAnimation(scrollOffset);
    isInteractingRef.current = true;
  }, [scrollOffset]);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      syncActiveIndex(event);
      scrollOffset.value = event.nativeEvent.contentOffset.x;
      isInteractingRef.current = false;
    },
    [scrollOffset, syncActiveIndex],
  );

  const handleMomentumScrollBegin = useCallback(() => {
    cancelAnimation(scrollOffset);
    isInteractingRef.current = true;
  }, [scrollOffset]);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const activeIndex = syncActiveIndex(event);
      scrollOffset.value = event.nativeEvent.contentOffset.x;

      if (itemCount > 1 && activeIndex === itemCount) {
        resetLoopPosition();
      }

      isInteractingRef.current = false;
    },
    [itemCount, resetLoopPosition, scrollOffset, syncActiveIndex],
  );

  return {
    carouselRef,
    handleMomentumScrollBegin,
    handleMomentumScrollEnd,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  };
}
