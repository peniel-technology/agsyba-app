import { render } from '@testing-library/react-native';

import { WomensTrending } from '@/features/products/components/WomensTrending';
import type { CircularCategoryItem } from '@/types/circularCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: CircularCategoryItem = {
  id: 'maxi-dresses',
  image: 1,
  imageAccessibilityLabel: 'Neutral layered maxi dress',
  name: 'Maxi Dresses',
};

describe('WomensTrending', () => {
  it('renders the shared circular section with women’s content', () => {
    const { getByLabelText, getByText } = render(<WomensTrending categories={[category]} />);

    expect(getByText("Trending in Women's")).toBeTruthy();
    expect(getByText('Maxi Dresses')).toBeTruthy();
    expect(getByLabelText("Trending women's categories")).toHaveProp('horizontal', true);
    expect(getByLabelText('Neutral layered maxi dress')).toBeTruthy();
  });
});
