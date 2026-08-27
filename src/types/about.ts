import type { ImageSourcePropType } from 'react-native';

export type AboutCoreValueIcon = 'quality' | 'customer' | 'sustainable';

export interface AboutHeroContent {
  description: string;
  image: ImageSourcePropType;
  title: string;
}

export interface AboutStoryContent {
  eyebrow: string;
  paragraphs: readonly string[];
  signature: string;
  title: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutCoreValue {
  description: string;
  icon: AboutCoreValueIcon;
  id: string;
  title: string;
}

export interface AboutMissionContent {
  label: string;
  quote: string;
}

export interface AboutPageContent {
  coreValues: readonly AboutCoreValue[];
  coreValuesTitle: string;
  hero: AboutHeroContent;
  mission: AboutMissionContent;
  stats: readonly AboutStat[];
  story: AboutStoryContent;
}
