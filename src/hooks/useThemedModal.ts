import { useCallback, useMemo, useState } from 'react';

import type { ThemedModalOptions, ThemedModalProps } from '@/components/modals/ThemedModal';

export function useThemedModal() {
  const [modal, setModal] = useState<ThemedModalOptions | null>(null);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const openModal = useCallback((options: ThemedModalOptions) => {
    setModal(options);
  }, []);

  const modalProps = useMemo<ThemedModalProps>(
    () => ({
      actions: modal?.actions,
      dismissible: modal?.dismissible,
      isVisible: modal !== null,
      message: modal?.message ?? '',
      onClose: closeModal,
      title: modal?.title ?? '',
      tone: modal?.tone,
    }),
    [closeModal, modal],
  );

  return { closeModal, modalProps, openModal };
}
