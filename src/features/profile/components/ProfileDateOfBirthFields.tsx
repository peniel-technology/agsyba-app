import { ChevronDown, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths, spacing } from '@/theme';

export type DateOfBirthPart = 'day' | 'month' | 'year';

interface ProfileDateOfBirthFieldsProps {
  day: string;
  month: string;
  onChange: (part: DateOfBirthPart, value: string) => void;
  year: string;
}

const monthOptions = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
] as const;

const dayOptions = Array.from({ length: 31 }, (_, index) => String(index + 1));

function getYearOptions() {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 121 }, (_, index) => String(currentYear - index));
}

function getPartLabel(part: DateOfBirthPart): string {
  if (part === 'day') {
    return 'day';
  }

  if (part === 'month') {
    return 'month';
  }

  return 'year';
}

function getValueLabel(part: DateOfBirthPart, value: string): string {
  if (!value) {
    return getPartLabel(part);
  }

  if (part === 'month') {
    return monthOptions.find((option) => option.value === value)?.label || value;
  }

  return value;
}

export function ProfileDateOfBirthFields({
  day,
  month,
  onChange,
  year,
}: ProfileDateOfBirthFieldsProps) {
  const insets = useSafeAreaInsets();
  const [openPart, setOpenPart] = useState<DateOfBirthPart | null>(null);
  const yearOptions = useMemo(getYearOptions, []);

  const options =
    openPart === 'day' ? dayOptions : openPart === 'month' ? monthOptions : yearOptions;

  const handleSelect = (value: string) => {
    if (!openPart) {
      return;
    }

    onChange(openPart, value);
    setOpenPart(null);
  };

  return (
    <View className="gap-2">
      <Text variant="captionStrong">Date of Birth</Text>
      <View className="flex-row gap-2">
        {(['day', 'month', 'year'] as const).map((part) => {
          const value = part === 'day' ? day : part === 'month' ? month : year;

          return (
            <Pressable
              accessibilityLabel={`Select ${getPartLabel(part)}`}
              accessibilityRole="button"
              accessibilityState={{ expanded: openPart === part }}
              className="min-h-12 flex-1 flex-row items-center justify-between rounded-sm border border-border bg-surface px-3 py-3 active:bg-subtle-surface"
              key={part}
              onPress={() => setOpenPart(part)}
            >
              <Text
                className={value ? '' : 'capitalize'}
                tone={value ? 'default' : 'muted'}
                variant="detail"
              >
                {getValueLabel(part, value)}
              </Text>
              <ChevronDown
                accessible={false}
                color={colors.muted}
                size={iconSizes.compact}
                strokeWidth={iconStrokeWidths.regular}
              />
            </Pressable>
          );
        })}
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setOpenPart(null)}
        transparent
        visible={openPart !== null}
      >
        <View className="flex-1 justify-end bg-black/30">
          <Pressable
            accessibilityLabel="Close date picker"
            accessibilityRole="button"
            className="flex-1"
            onPress={() => setOpenPart(null)}
          />
          <View
            className="max-h-[70%] rounded-t-3xl bg-surface px-4 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom + spacing[4], spacing[6]) }}
          >
            <View className="flex-row items-center justify-between border-b border-subtle-border pb-4">
              <Text variant="title">Select {openPart ? getPartLabel(openPart) : ''}</Text>
              <Pressable
                accessibilityLabel="Close date picker"
                accessibilityRole="button"
                className="size-9 items-center justify-center rounded-full active:bg-subtle-surface"
                hitSlop={spacing[1]}
                onPress={() => setOpenPart(null)}
              >
                <X
                  accessible={false}
                  color={colors.text}
                  size={iconSizes.medium}
                  strokeWidth={iconStrokeWidths.regular}
                />
              </Pressable>
            </View>
            <ScrollView contentContainerClassName="gap-2 pt-4" showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                const isSelected =
                  value === (openPart === 'day' ? day : openPart === 'month' ? month : year);

                return (
                  <Pressable
                    accessibilityLabel={label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    className={`min-h-12 flex-row items-center justify-between rounded-sm px-4 py-3 ${isSelected ? 'bg-sale-surface' : 'active:bg-subtle-surface'}`}
                    key={value}
                    onPress={() => handleSelect(value)}
                  >
                    <Text tone={isSelected ? 'brand' : 'default'} variant="body">
                      {label}
                    </Text>
                    {isSelected ? (
                      <Text tone="brand" variant="captionStrong">
                        Selected
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
