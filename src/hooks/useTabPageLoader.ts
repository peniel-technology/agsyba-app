import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { motion } from '@/theme';

export function useTabPageLoader(): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, motion.tabPageLoaderMs);

      return () => clearTimeout(timeout);
    }, []),
  );

  return isLoading;
}
