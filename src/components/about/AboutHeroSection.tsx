import type { ImageSourcePropType } from 'react-native';
import { ImageBackground, View } from 'react-native';

import { Text } from '@/components/ui/Text';

export interface AboutHeroSectionProps {
  description: string;
  image: ImageSourcePropType;
  title: string;
}

export function AboutHeroSection({ description, image, title }: AboutHeroSectionProps) {
  return (
    <ImageBackground
      accessibilityLabel="About hero banner"
      className="relative h-96 w-full bg-stone-900"
      source={image}
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-stone-900/50" />
      <View className="absolute inset-0 items-center justify-center px-6">
        <View className="w-full items-center gap-4">
          <Text
            className="text-center text-4xl font-normal leading-10 font-instrument-serif text-white"
            variant="promotionalTitle"
          >
            {title}
          </Text>
          <Text
            className="text-center text-sm font-manrope font-normal leading-5 text-white opacity-80"
            variant="detailMedium"
          >
            {description}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
