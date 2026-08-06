import { MessageCircle, Clock, Mail, MapPin, type LucideIcon, Phone } from 'lucide-react-native';
import { Path, Svg } from 'react-native-svg';
import { type ReactNode } from 'react';
import { View } from 'react-native';

import { ContactInfoItem } from '@/components/contact/ContactInfoItem';
import { ContactSocialLinks } from '@/components/contact/ContactSocialLinks';
import { Text } from '@/components/ui/Text';
import type { ContactInformationData } from '@/data/contactInformation';
import { colors } from '@/theme';

interface ContactInformationCardProps {
  data: ContactInformationData;
}

const infoIconMap: Record<ContactInformationData['items'][number]['icon'], LucideIcon> = {
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

function resolveInfoIcon(icon: ContactInformationData['items'][number]['icon']) {
  const Icon = infoIconMap[icon];

  return <Icon color={colors.brand} size={16} strokeWidth={2} />;
}

function InstagramSocialIcon({ color }: { color: string }) {
  return (
    <Svg fill="none" height={16} viewBox="0 0 16 16" width={16}>
      <Path d="M11.6662 4.33325H11.6729" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
      <Path
        d="M4.66563 1.33301H11.3328C13.1739 1.33301 14.6664 2.82551 14.6664 4.66661V11.3338C14.6664 13.1749 13.1739 14.6674 11.3328 14.6674H4.66563C2.82453 14.6674 1.33203 13.1749 1.33203 11.3338V4.66661C1.33203 2.82551 2.82453 1.33301 4.66563 1.33301ZM10.6659 7.58038C10.7482 8.13525 10.6534 8.70194 10.3951 9.19985C10.1367 9.69775 9.72794 10.1015 9.22689 10.3537C8.72583 10.6059 8.15801 10.6937 7.6042 10.6046C7.05038 10.5155 6.53876 10.254 6.14211 9.85733C5.74547 9.46069 5.48399 8.94907 5.39487 8.39525C5.30576 7.84143 5.39354 7.27361 5.64573 6.77256C5.89793 6.27151 6.30169 5.86273 6.7996 5.60438C7.2975 5.34602 7.86419 5.25125 8.41907 5.33353C8.98506 5.41746 9.50906 5.6812 9.91365 6.08579C10.3182 6.49039 10.582 7.01438 10.6659 7.58038Z"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function FacebookSocialIcon({ color }: { color: string }) {
  return (
    <Svg fill="none" height={16} viewBox="0 0 16 16" width={16}>
      <Path
        d="M10.0009 1.33301H12.0008V3.99989H10.0009C9.82412 3.99989 9.65456 4.07013 9.52954 4.19517C9.40453 4.3202 9.3343 4.48978 9.3343 4.66661V6.66677H12.0008L11.3342 9.33365H9.3343V14.6674H6.66782V9.33365H4.66797V6.66677H6.66782V4.66661C6.66782 3.78248 7.01899 2.93457 7.64406 2.3094C8.26914 1.68423 9.11692 1.33301 10.0009 1.33301Z"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function MailSocialIcon({ color }: { color: string }) {
  return (
    <Svg fill="none" height={16} viewBox="0 0 16 16" width={16}>
      <Path
        d="M14.6664 4.66679L8.67195 8.48441C8.46853 8.60254 8.23748 8.66476 8.00223 8.66476C7.76699 8.66476 7.53593 8.60254 7.33251 8.48441L1.33203 4.66679M2.66547 2.66699H13.333C14.0694 2.66699 14.6664 3.26389 14.6664 4.00019V11.9994C14.6664 12.7357 14.0694 13.3326 13.333 13.3326H2.66547C1.92903 13.3326 1.33203 12.7357 1.33203 11.9994V4.00019C1.33203 3.26389 1.92903 2.66699 2.66547 2.66699Z"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function XSocialIcon({ color }: { color: string }) {
  return (
    <Svg fill="none" height={16} viewBox="0 0 16 16" width={16}>
      <Path
        d="M9.99939 6.00005L5.99907 10.0004M5.99907 6.00005L9.99939 10.0004M14.6664 8.00021C14.6664 11.6824 11.6814 14.6674 7.99923 14.6674C4.31704 14.6674 1.33203 11.6824 1.33203 8.00021C1.33203 4.31801 4.31704 1.33301 7.99923 1.33301C11.6814 1.33301 14.6664 4.31801 14.6664 8.00021Z"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function resolveSocialIcon(icon: ContactInformationData['socialLinks'][number]['icon']): ReactNode {
  if (icon === 'instagram') {
    return <InstagramSocialIcon color={colors.brandForeground} />;
  }

  if (icon === 'facebook') {
    return <FacebookSocialIcon color={colors.brandForeground} />;
  }

  if (icon === 'mail') {
    return <MailSocialIcon color={colors.brandForeground} />;
  }

  if (icon === 'twitter') {
    return <XSocialIcon color={colors.brandForeground} />;
  }

  return <MessageCircle color={colors.brandForeground} size={16} strokeWidth={1.5} />;
}

export function ContactInformationCard({ data }: ContactInformationCardProps) {
  return (
    <View className="self-stretch rounded-lg bg-stone-50 border border-zinc-100 p-6 mx-4">
      <View className="flex-col items-start justify-start gap-7">
        <View className="flex-col items-start justify-start gap-1.5">
          <Text className="font-manrope text-xl font-bold text-neutral-900">{data.title}</Text>
          <Text className="font-manrope text-xs font-normal text-neutral-500">{data.subtitle}</Text>
        </View>

        <View className="self-stretch flex-col items-start justify-start gap-5">
          {data.items.map((item) => (
            <ContactInfoItem
              icon={resolveInfoIcon(item.icon)}
              label={item.label}
              key={item.id}
              value={item.value}
              valueColor={item.valueColor}
            />
          ))}
        </View>

        <View className="self-stretch flex-col items-start justify-start gap-3">
          <Text className="text-sm font-bold text-neutral-900">Follow Us</Text>
          <ContactSocialLinks
            items={data.socialLinks.map((link) => ({
              id: link.id,
              icon: resolveSocialIcon(link.icon),
              onPress: link.onPress,
            }))}
          />
        </View>
      </View>
    </View>
  );
}
