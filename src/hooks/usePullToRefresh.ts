import { useCallback, useEffect, useRef, useState } from 'react';

import { motion } from '@/theme';

interface PullToRefreshResult {
  isRefreshing: boolean;
  refresh: () => Promise<void>;
}

function wait(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export function usePullToRefresh(
  onRefresh: () => Promise<void> | void,
  minimumDurationMs: number = motion.pullToRefreshLoaderMs,
): PullToRefreshResult {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMountedRef = useRef(true);
  const isRefreshInProgressRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    if (isRefreshInProgressRef.current) {
      return;
    }

    isRefreshInProgressRef.current = true;
    setIsRefreshing(true);
    const refreshStartedAt = Date.now();

    try {
      await onRefresh();
    } finally {
      const elapsedMs = Date.now() - refreshStartedAt;
      const remainingDurationMs = Math.max(0, minimumDurationMs - elapsedMs);

      if (remainingDurationMs > 0) {
        await wait(remainingDurationMs);
      }

      isRefreshInProgressRef.current = false;
      if (isMountedRef.current) {
        setIsRefreshing(false);
      }
    }
  }, [minimumDurationMs, onRefresh]);

  return { isRefreshing, refresh };
}
