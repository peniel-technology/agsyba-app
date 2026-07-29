import { render } from '@testing-library/react-native';

import { FootwearTrending } from '@/features/products/components/FootwearTrending';
import type { CircularCategoryItem } from '@/types/circularCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: CircularCategoryItem = {
  id: 'white-sneakers',
  image: 1,
  imageAccessibilityLabel: 'Minimal white low-top sneaker',
  name: 'White Sneakers',
};

describe('FootwearTrending', () => {
  it('renders the shared circular section with footwear content', () => {
    const { getByLabelText, getByText } = render(<FootwearTrending categories={[category]} />);

    expect(getByText('Trending in Footwear')).toBeTruthy();
    expect(getByText('White Sneakers')).toBeTruthy();
    expect(getByLabelText('Trending footwear categories')).toHaveProp('horizontal', true);
    expect(getByLabelText('Minimal white low-top sneaker')).toBeTruthy();
  });
});
