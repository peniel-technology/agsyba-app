import { ThemedModal } from '@/components/modals/ThemedModal';

type StatusModalTone = 'error' | 'success';

interface StatusModalProps {
  actionLabel?: string;
  isVisible: boolean;
  message: string;
  onAction?: () => void;
  onClose: () => void;
  title: string;
  tone: StatusModalTone;
}

export function StatusModal({
  actionLabel = 'OK',
  isVisible,
  message,
  onAction,
  onClose,
  title,
  tone,
}: StatusModalProps) {
  return (
    <ThemedModal
      actions={[{ label: actionLabel, onPress: onAction }]}
      closeOnActionPress={!onAction}
      isVisible={isVisible}
      message={message}
      onClose={onClose}
      title={title}
      tone={tone}
    />
  );
}
