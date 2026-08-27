import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';

import { Screen } from '@/components/layouts';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import { ContactHeroSection } from '@/components/contact/ContactHeroSection';
import { ContactFAQSection } from '@/components/contact/ContactFAQSection';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactInformationCard } from '@/components/contact/ContactInformationCard';
import { routes } from '@/constants/routes';
import { contactSupportEmail } from '@/data/contactInformation';
import { contactPageData } from '@/data/contactPage';
import type { ContactFormValues } from '@/features/contact/schemas/contactFormSchema';
import { openContactEmailDraft } from '@/services/contact/contactEmail';
import { useCartStore } from '@/stores/useCartStore';

export default function ContactScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.itemCount);
  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.home);
  }, [router]);
  const handleContactFormSubmit = useCallback(async (values: ContactFormValues) => {
    try {
      await openContactEmailDraft(contactSupportEmail, values);
    } catch {
      Alert.alert(
        'Unable to open email',
        `Please email us directly at ${contactSupportEmail} and we will get back to you within 24 hours.`,
      );
    }
  }, []);

  return (
    <Screen includeBottomInset={false} padded={false}>
      <ShoppingBagHeader
        itemCount={cartItemCount}
        onBackPress={handleBackPress}
        title="Contact Us"
        titleClassName="text-base"
      />
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-6 pb-6 pt-4"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <ContactHeroSection {...contactPageData.hero} />
        <ContactInformationCard data={contactPageData.information} />
        <ContactFormSection data={contactPageData.form} onSubmit={handleContactFormSubmit} />
        <ContactFAQSection data={contactPageData.faq} />
      </ScrollView>
    </Screen>
  );
}
