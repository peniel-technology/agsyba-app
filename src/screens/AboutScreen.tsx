import aboutHeroImage from '@/assets/images/aboutus/aboutusHeroSection.webp';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { AboutHeroSection } from '@/components/about/AboutHeroSection';
import { AboutCoreValuesSection } from '@/components/about/AboutCoreValuesSection';
import { AboutMissionSection } from '@/components/about/AboutMissionSection';
import { AboutStatsSection } from '@/components/about/AboutStatsSection';
import { AboutStorySection } from '@/components/about/AboutStorySection';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { Screen } from '@/components/layouts';
import { routes } from '@/constants/routes';
import { useCartStore } from '@/stores/useCartStore';

const aboutHero = {
  description:
    'Since 2018, STYARA has been curating the finest contemporary fashion for the modern, conscious consumer.',
  title: 'Redefining Fashion, One Collection at a Time',
} as const;

const aboutStory = {
  eyebrow: 'OUR STORY',
  paragraphs: [
    "Founded in the heart of the city, STYARA began as a small boutique in Dubai with a big dream: to create a space where fashion meets art. We believe that clothing is more than just fabric it's a form of self-expression that empowers individuals to tell their unique story.",
    "Over the last decade, we've grown from a single boutique into a leading global fashion destination, yet our core values remain unchanged. Every piece in our collection is handpicked for its quality, craftsmanship, and timeless appeal.",
    'Our commitment to excellence means working directly with artisans and premium brands that share our vision for a more stylish and sustainable future.',
  ],
  signature: 'Sarah Mitchell, Founder & Creative Director',
  title: 'Born from a Passion for Style',
} as const;

const aboutStats = [
  {
    label: 'Years of Excellence',
    value: '10+',
  },
  {
    label: 'Happy Customers',
    value: '2M+',
  },
  {
    label: 'Premium Brands',
    value: '50+',
  },
  {
    label: 'Countries We Serve',
    value: '180+',
  },
];

const coreValues = [
  {
    description:
      'We curate collections from the finest materials, ensuring every piece meets our rigorous quality standards.',
    icon: 'quality',
    id: 'quality',
    title: 'Quality First',
  },
  {
    description:
      'Our customers are at the heart of everything we do, from personalized recommendations to exceptional support.',
    icon: 'customer',
    id: 'customer',
    title: 'Customer Love',
  },
  {
    description:
      "We're committed to reducing our environmental footprint through ethical sourcing and eco-friendly packaging.",
    icon: 'sustainable',
    id: 'sustainable',
    title: 'Sustainable Fashion',
  },
];

const aboutCoreValuesTitle = 'Our Core Values';
const aboutMissionLabel = 'OUR MISSION';
const aboutMissionQuote =
  '"To make premium fashion accessible, sustainable, and personal for every wardrobe."';

export default function AboutScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.itemCount);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <ShoppingBagHeader itemCount={cartItemCount} onBackPress={handleBackPress} title="About Us" />
      <ScrollView className="bg-background" contentContainerClassName="pb-6">
        <AboutHeroSection
          description={aboutHero.description}
          image={aboutHeroImage}
          title={aboutHero.title}
        />
        <AboutStorySection
          eyebrow={aboutStory.eyebrow}
          paragraphs={aboutStory.paragraphs}
          signature={aboutStory.signature}
          title={aboutStory.title}
        />
        <AboutStatsSection stats={aboutStats} />
        <AboutCoreValuesSection title={aboutCoreValuesTitle} values={coreValues} />
        <AboutMissionSection label={aboutMissionLabel} quote={aboutMissionQuote} />
      </ScrollView>
    </Screen>
  );
}
