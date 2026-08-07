import { useRouter } from 'expo-router';
import contactHeroImage from '../../assets/images/aboutus/contactPageHeroSectionImg.webp';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { Screen } from '@/components/layouts';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { ContactHeroSection } from '@/components/contact/ContactHeroSection';
import { ContactFAQSection } from '@/components/contact/ContactFAQSection';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactInformationCard } from '@/components/contact/ContactInformationCard';
import { contactInformation } from '@/data/contactInformation';
import { contactFaqData } from '@/data/contactFaq';
import { contactFormData, type ContactFormValues } from '@/data/contactForm';
import { routes } from '@/constants/routes';
import { useCartStore } from '@/stores/useCartStore';

const contactHero = {
  badge: 'GET IN TOUCH',
  image: contactHeroImage,
  subtitle: 'Our team is here to help \u2014 reach out anytime.',
  title: "We'd Love to Hear From You",
} as const;

export default function ContactScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.itemCount);
  const [contactFormValues, setContactFormValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject:
      contactFormData.fields.find((field) => field.id === 'subject')?.placeholder ??
      'General Inquiry',
    message: '',
    agreement: 'false',
  });

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const handleContactFormChange = useCallback(
    (fieldId: keyof ContactFormValues | 'agreement', value: string) => {
      setContactFormValues((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    },
    [],
  );
  const handleContactFormSubmit = useCallback(() => {
    return;
  }, []);
  const handleViewAllFaq = useCallback(() => {
    return;
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <ShoppingBagHeader
        itemCount={cartItemCount}
        onBackPress={handleBackPress}
        title="Contact Us"
        titleClassName="text-base"
      />
      <ScrollView className="bg-background" contentContainerClassName="gap-6 pb-6 pt-4">
        <ContactHeroSection
          badge={contactHero.badge}
          image={contactHero.image}
          subtitle={contactHero.subtitle}
          title={contactHero.title}
        />
        <ContactInformationCard data={contactInformation} />
        <ContactFormSection
          data={contactFormData}
          values={contactFormValues}
          onChange={handleContactFormChange}
          onSubmit={handleContactFormSubmit}
        />
        <ContactFAQSection data={contactFaqData} onViewAllPress={handleViewAllFaq} />
      </ScrollView>
    </Screen>
  );
}
