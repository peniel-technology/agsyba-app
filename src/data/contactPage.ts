import contactHeroImage from '@/assets/images/aboutus/contactPageHeroSectionImg.webp';

import { contactFaqData } from '@/data/contactFaq';
import { contactFormData } from '@/data/contactForm';
import { contactInformation } from '@/data/contactInformation';

export const contactPageData = {
  faq: contactFaqData,
  form: contactFormData,
  hero: {
    badge: 'GET IN TOUCH',
    image: contactHeroImage,
    subtitle: 'Our team is here to help — reach out anytime.',
    title: "We'd Love to Hear From You",
  },
  information: contactInformation,
} as const;
