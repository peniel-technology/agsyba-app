import { View } from 'react-native';

import { Text } from '@/components/ui/Text';

interface StoryHeaderProps {
  eyebrow: string;
  title: string;
}

function StoryHeader({ eyebrow, title }: StoryHeaderProps) {
  return (
    <View className="flex-col items-start gap-2">
      <Text className="text-sm uppercase" tone="brand" variant="badge">
        {eyebrow}
      </Text>
      <Text className="leading-10" variant="promotionalTitle">
        {title}
      </Text>
    </View>
  );
}

interface StoryParagraphsProps {
  paragraphs: readonly string[];
}

function StoryParagraphs({ paragraphs }: StoryParagraphsProps) {
  return (
    <View className="flex-col gap-4">
      {paragraphs.map((paragraph) => (
        <Text
          key={paragraph}
          tone="muted"
          className="leading-relaxed text-sm font-normal"
          variant="detailMedium"
        >
          {paragraph}
        </Text>
      ))}
    </View>
  );
}

function AccentDivider() {
  return <View className="h-0 w-14 border-t-2 border-red-500" />;
}

interface StoryFounderProps {
  signature: string;
}

function StoryFounder({ signature }: StoryFounderProps) {
  return (
    <Text className="text-xl leading-7" variant="promotionalTitle">
      {signature}
    </Text>
  );
}

export interface AboutStorySectionProps {
  eyebrow: string;
  paragraphs: readonly string[];
  signature: string;
  title: string;
}

export function AboutStorySection({
  eyebrow,
  paragraphs,
  signature,
  title,
}: AboutStorySectionProps) {
  return (
    <View className="gap-6 bg-white p-6">
      <StoryHeader eyebrow={eyebrow} title={title} />
      <StoryParagraphs paragraphs={paragraphs} />
      <AccentDivider />
      <StoryFounder signature={signature} />
    </View>
  );
}
