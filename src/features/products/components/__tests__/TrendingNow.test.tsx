import { render } from '@testing-library/react-native';

import { TrendingNow } from '@/features/products/components/TrendingNow';
import type { CircularCategoryItem } from '@/types/circularCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: CircularCategoryItem = {
  id: 'new-arrivals',
  image: 1,
  imageAccessibilityLabel: 'Emerald evening gown displayed in a studio',
  name: 'New Arrivals',
};

describe('TrendingNow', () => {
  it('renders the shared circular category section with trending content', () => {
    const { getByLabelText, getByText } = render(<TrendingNow categories={[category]} />);

    expect(getByText('Trending Now')).toBeTruthy();
    expect(getByText('New Arrivals')).toBeTruthy();
    expect(getByLabelText('Trending categories')).toHaveProp('horizontal', true);
    expect(getByLabelText('Emerald evening gown displayed in a studio')).toBeTruthy();
  });
});
