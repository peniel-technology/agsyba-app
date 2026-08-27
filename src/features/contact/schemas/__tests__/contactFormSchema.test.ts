import {
  contactFormSchema,
  type ContactFormValues,
} from '@/features/contact/schemas/contactFormSchema';

const validContactFormValues: ContactFormValues = {
  agreement: true,
  email: 'customer@example.com',
  firstName: 'Alex',
  lastName: 'Morgan',
  message: 'I would like to learn more about your latest collection.',
  phone: '+91 123 456 7890',
  subject: 'General Inquiry',
};

describe('contactFormSchema', () => {
  it('accepts a complete contact form', () => {
    expect(contactFormSchema.safeParse(validContactFormValues).success).toBe(true);
  });

  it('rejects incomplete contact form values', () => {
    const result = contactFormSchema.safeParse({
      ...validContactFormValues,
      agreement: false,
      email: 'not-an-email',
      message: 'Too short',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining(['agreement', 'email', 'message']),
      );
    }
  });

  it('rejects phone values without enough digits', () => {
    const result = contactFormSchema.safeParse({
      ...validContactFormValues,
      phone: '+-------',
    });

    expect(result.success).toBe(false);
  });
});
