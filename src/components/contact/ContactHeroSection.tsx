import { Image } from 'expo-image';
import { type ImageSource, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface ContactHeroSectionProps {
  image: ImageSource;
  badge: string;
  title: string;
  subtitle: string;
}

export function ContactHeroSection({ image, badge, title, subtitle }: ContactHeroSectionProps) {
  return (
    <View className="relative h-80 w-full overflow-hidden">
      <Image
        accessibilityLabel={badge}
        contentPosition="center"
        contentFit="cover"
        source={image}
        style={StyleSheet.absoluteFillObject}
        className="bg-stone-900"
      />
      <View className="absolute inset-0 bg-stone-900/60" />
      <View className="absolute inset-0 items-center justify-center p-6">
        <View className="w-full flex flex-col items-center justify-start gap-3">
          <Text className="text-red-500 text-xs font-manrope-extrabold uppercase">{badge}</Text>
          <Text className="uppercase text-center" tone="brandForeground" variant="promotionalTitle">
            {title}
          </Text>
          <Text className="self-stretch text-center text-sm font-manrope font-normal text-white opacity-80">
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}
