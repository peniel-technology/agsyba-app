import { memo, useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { FAQAccordion } from '@/components/contact/FAQAccordion';
import { Text } from '@/components/ui/Text';
import type { ContactFaqData } from '@/data/contactFaq';

interface ContactFAQSectionProps {
  data: ContactFaqData;
  onViewAllPress: () => void;
}

export const ContactFAQSection = memo(function ContactFAQSection({
  data,
  onViewAllPress,
}: ContactFAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAccordionPress = useCallback((id: string) => {
    setExpandedId((currentId) => {
      if (currentId === id) {
        return null;
      }

      return id;
    });
  }, []);

  return (
    <View className="self-stretch gap-6 bg-white p-6">
      <View className="self-stretch flex-col items-center gap-1.5">
        <Text
          className="self-stretch text-center text-3xl font-instrument-serif text-neutral-900"
          variant="promotionalTitle"
        >
          {data.title}
        </Text>
        <Text className="self-stretch text-center text-sm font-manrope leading-5 text-neutral-500 py-1">
          {data.subtitle}
        </Text>
      </View>

      <View className="self-stretch flex-col gap-4">
        {data.faqs.map((faq) => (
          <View key={faq.id}>
            <FAQAccordion
              description={faq.answer}
              expanded={expandedId === faq.id}
              onPress={() => {
                handleAccordionPress(faq.id);
              }}
              title={faq.question}
            />
          </View>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={data.buttonText}
        className="self-stretch h-11 w-full rounded-sm border border-zinc-900 items-center justify-center"
        onPress={onViewAllPress}
      >
        <Text className="text-xs font-manrope-bold uppercase text-neutral-900">
          {data.buttonText}
        </Text>
      </Pressable>
    </View>
  );
});
