import { Image } from 'expo-image';
import { StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface ContactHeroSectionProps {
  image: ImageSourcePropType;
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
          <Text className="text-center uppercase" tone="brand" variant="overline">
            {badge}
          </Text>
          <Text className="text-center uppercase" tone="brandForeground" variant="promotionalTitle">
            {title}
          </Text>
          <Text
            className="self-stretch text-center text-sm font-manrope font-normal text-white opacity-80"
            variant="body"
          >
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}
