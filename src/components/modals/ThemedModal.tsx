import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useCallback, type ComponentProps } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

export type ThemedModalTone = 'default' | 'error' | 'info' | 'success' | 'warning';
export type ThemedModalActionVariant = 'destructive' | 'primary' | 'secondary';

export interface ThemedModalAction {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  variant?: ThemedModalActionVariant;
}

export interface ThemedModalOptions {
  actions?: readonly ThemedModalAction[];
  dismissible?: boolean;
  message: string;
  title: string;
  tone?: ThemedModalTone;
}

export interface ThemedModalProps extends ThemedModalOptions {
  closeOnActionPress?: boolean;
  isVisible: boolean;
  onClose: () => void;
}

interface ToneConfig {
  iconBackgroundClassName: string;
  iconColor: string;
  Icon: LucideIcon;
  titleTone: NonNullable<ComponentProps<typeof Text>['tone']>;
}

const defaultActions: readonly ThemedModalAction[] = [{ label: 'OK' }];

function getToneConfig(tone: ThemedModalTone): ToneConfig {
  switch (tone) {
    case 'error':
      return {
        iconBackgroundClassName: 'bg-sale-surface',
        iconColor: colors.error,
        Icon: CircleAlert,
        titleTone: 'error',
      };
    case 'info':
      return {
        iconBackgroundClassName: 'bg-primary/10',
        iconColor: colors.primary,
        Icon: Info,
        titleTone: 'primary',
      };
    case 'success':
      return {
        iconBackgroundClassName: 'bg-success-surface',
        iconColor: colors.success,
        Icon: CircleCheck,
        titleTone: 'success',
      };
    case 'warning':
      return {
        iconBackgroundClassName: 'bg-subtle-surface',
        iconColor: colors.cardChip,
        Icon: TriangleAlert,
        titleTone: 'warning',
      };
    default:
      return {
        iconBackgroundClassName: 'bg-subtle-surface',
        iconColor: colors.muted,
        Icon: Info,
        titleTone: 'default',
      };
  }
}

function getActionClassName(variant: ThemedModalActionVariant): string {
  switch (variant) {
    case 'destructive':
      return 'bg-error';
    case 'secondary':
      return 'border border-border bg-surface';
    default:
      return 'bg-brand';
  }
}

function getActionTextTone(
  variant: ThemedModalActionVariant,
): NonNullable<ComponentProps<typeof Text>['tone']> {
  return variant === 'secondary' ? 'default' : 'brandForeground';
}

export function ThemedModal({
  actions = defaultActions,
  closeOnActionPress = true,
  dismissible = true,
  isVisible,
  message,
  onClose,
  title,
  tone = 'info',
}: ThemedModalProps) {
  const { iconBackgroundClassName, iconColor, Icon, titleTone } = getToneConfig(tone);
  const handleActionPress = useCallback(
    (action: ThemedModalAction) => {
      if (action.disabled) {
        return;
      }

      if (closeOnActionPress) {
        onClose();
      }
      action.onPress?.();
    },
    [closeOnActionPress, onClose],
  );

  return (
    <Modal
      accessibilityViewIsModal
      animationType="fade"
      onRequestClose={dismissible ? onClose : undefined}
      statusBarTranslucent
      transparent
      visible={isVisible}
    >
      <View className="flex-1 items-center justify-center px-6">
        {dismissible ? (
          <Pressable
            accessibilityLabel={`Dismiss ${title}`}
            accessibilityRole="button"
            className="absolute inset-0 bg-drawer-backdrop/55"
            onPress={onClose}
          />
        ) : (
          <View className="absolute inset-0 bg-drawer-backdrop/55" />
        )}

        <View
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          className="w-full max-w-sm rounded-2xl border border-subtle-border bg-surface p-5 shadow-lg"
        >
          <View className="flex-row items-start justify-between gap-4">
            <View
              className={`size-12 items-center justify-center rounded-full ${iconBackgroundClassName}`}
            >
              <Icon
                accessible={false}
                color={iconColor}
                size={iconSizes.large}
                strokeWidth={iconStrokeWidths.emphasized}
              />
            </View>

            {dismissible ? (
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
            ) : null}
          </View>

          <Text className="mt-4" tone={titleTone} variant="title">
            {title}
          </Text>
          <Text className="mt-2 leading-6" tone="muted">
            {message}
          </Text>

          <View className="mt-6 gap-2">
            {actions.map((action) => {
              const variant = action.variant ?? 'primary';

              return (
                <Pressable
                  accessibilityLabel={action.label}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: action.disabled }}
                  className={`min-h-12 items-center justify-center rounded-md px-5 active:opacity-80 ${getActionClassName(variant)} ${action.disabled ? 'opacity-50' : ''}`}
                  disabled={action.disabled}
                  key={action.label}
                  onPress={() => handleActionPress(action)}
                >
                  <Text tone={getActionTextTone(variant)} variant="label">
                    {action.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
