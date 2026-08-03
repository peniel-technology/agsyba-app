import { CircleAlert, CircleCheck, X } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

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
  const isError = tone === 'error';
  const Icon = isError ? CircleAlert : CircleCheck;
  const iconColor = isError ? colors.error : colors.success;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={isVisible}
    >
      <View accessibilityViewIsModal className="flex-1 items-center justify-center px-6">
        <Pressable
          accessibilityLabel={`Dismiss ${title}`}
          accessibilityRole="button"
          className="absolute inset-0 bg-drawer-backdrop/55"
          onPress={onClose}
        />

        <View
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-lg"
        >
          <View className="flex-row items-start justify-between gap-4">
            <View
              className={`size-12 items-center justify-center rounded-full ${isError ? 'bg-sale-surface' : 'bg-success-surface'}`}
            >
              <Icon
                accessible={false}
                color={iconColor}
                size={iconSizes.large}
                strokeWidth={iconStrokeWidths.emphasized}
              />
            </View>

            <Pressable
              accessibilityLabel="Close modal"
              accessibilityRole="button"
              className="size-10 items-center justify-center rounded-full active:bg-subtle-surface"
              hitSlop={spacing[1]}
              onPress={onClose}
            >
              <X
                accessible={false}
                color={colors.muted}
                size={iconSizes.medium}
                strokeWidth={iconStrokeWidths.regular}
              />
            </Pressable>
          </View>

          <Text className="mt-4" variant="title">
            {title}
          </Text>
          <Text className="mt-2 leading-6" tone="muted">
            {message}
          </Text>

          <Pressable
            accessibilityLabel={actionLabel}
            accessibilityRole="button"
            className="mt-6 min-h-12 items-center justify-center rounded-md bg-brand px-5 active:opacity-80"
            onPress={onAction ?? onClose}
          >
            <Text tone="brandForeground" variant="label">
              {actionLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
