import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { colors, iconSizes, iconStrokeWidths } from '@/theme';
import type { ContactInformationItem } from '@/types/contact';

export interface ContactInfoItemProps {
  icon: ContactInformationItem['icon'];
  label: ContactInformationItem['label'];
  value: ContactInformationItem['value'];
  valueSize?: ContactInformationItem['valueSize'];
  valueTone?: ContactInformationItem['valueTone'];
  valueWeight?: ContactInformationItem['valueWeight'];
}

const infoIconMap: Record<ContactInformationItem['icon'], LucideIcon> = {
  'map-pin': MapPin,
  clock: Clock,
  mail: Mail,
  phone: Phone,
};

function ContactInfoIcon({ icon }: Pick<ContactInfoItemProps, 'icon'>) {
  const Icon = infoIconMap[icon];

  return (
    <Icon color={colors.brand} size={iconSizes.compact} strokeWidth={iconStrokeWidths.emphasized} />
  );
}

export function ContactInfoItem({
  icon,
  label,
  value,
  valueSize = 'regular',
  valueTone = 'default',
  valueWeight = 'regular',
}: ContactInfoItemProps) {
  return (
    <View className="self-stretch flex-row items-start gap-4">
      <View className="size-9 items-center justify-center rounded-2xl bg-white shadow-md">
        <ContactInfoIcon icon={icon} />
      </View>
      <View className="flex-1 flex-col items-start gap-1">
        <Text tone="muted" variant="captionStrong">
          {label}
        </Text>
        <Text
          className={`self-stretch ${valueSize === 'compact' ? 'text-xs' : 'text-sm'} ${valueWeight === 'medium' ? 'font-medium' : 'font-normal'}`}
          tone={valueTone}
          variant="body"
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
