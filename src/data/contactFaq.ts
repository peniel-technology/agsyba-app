export interface ContactFaq {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFaqData {
  title: string;
  subtitle: string;
  buttonText: string;
  faqs: readonly ContactFaq[];
}

export const contactFaqData: ContactFaqData = {
  title: 'Frequently Asked Questions',
  subtitle: "Can't find what you're looking for? Browse our FAQ section.",
  buttonText: 'VIEW ALL FAQS',
  faqs: [
    {
      id: '1',
      question: 'How do I track my order?',
      answer:
        'You can track your order status in real-time through our tracking portal using your order ID.',
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy for all unworn and tagged items.',
    },
    {
      id: '3',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 180 countries worldwide with premium express delivery.',
    },
  ],
} as const;
