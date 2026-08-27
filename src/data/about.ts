import aboutHeroImage from '@/assets/images/aboutus/aboutusHeroSection.webp';
import type { AboutPageContent } from '@/types/about';

export const aboutPageData = {
  hero: {
    description:
      'Since 2018, STYARA has been curating the finest contemporary fashion for the modern, conscious consumer.',
    image: aboutHeroImage,
    title: 'Redefining Fashion, One Collection at a Time',
  },
  story: {
    eyebrow: 'OUR STORY',
    paragraphs: [
      "Founded in the heart of the city, STYARA began as a small boutique in Dubai with a big dream: to create a space where fashion meets art. We believe that clothing is more than just fabric—it's a form of self-expression that empowers individuals to tell their unique story.",
      "Over the last decade, we've grown from a single boutique into a leading global fashion destination, yet our core values remain unchanged. Every piece in our collection is handpicked for its quality, craftsmanship, and timeless appeal.",
      'Our commitment to excellence means working directly with artisans and premium brands that share our vision for a more stylish and sustainable future.',
    ],
    signature: 'Sarah Mitchell, Founder & Creative Director',
    title: 'Born from a Passion for Style',
  },
  stats: [
    { label: 'Years of Excellence', value: '10+' },
    { label: 'Happy Customers', value: '2M+' },
    { label: 'Premium Brands', value: '50+' },
    { label: 'Countries We Serve', value: '180+' },
  ],
  coreValues: [
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
  ],
  coreValuesTitle: 'Our Core Values',
  mission: {
    label: 'OUR MISSION',
    quote: '"To make premium fashion accessible, sustainable, and personal for every wardrobe."',
  },
} satisfies AboutPageContent;
