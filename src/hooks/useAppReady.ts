import { useCallback, useState } from 'react';

export function useAppReady() {
  const [isReady, setIsReady] = useState(false);
  const markReady = useCallback(() => setIsReady(true), []);
  return { isReady, markReady };
}
