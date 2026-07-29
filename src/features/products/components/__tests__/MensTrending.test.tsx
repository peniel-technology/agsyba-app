import { render } from '@testing-library/react-native';

import { MensTrending } from '@/features/products/components/MensTrending';
import type { CircularCategoryItem } from '@/types/circularCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: CircularCategoryItem = {
  id: 'linen-shirts',
  image: 1,
  imageAccessibilityLabel: 'Man wearing a blue linen shirt by the sea',
  name: 'Linen Shirts',
};

describe('MensTrending', () => {
  it('renders the shared circular section with men’s content', () => {
    const { getByLabelText, getByText } = render(<MensTrending categories={[category]} />);

    expect(getByText("Trending in Men's")).toBeTruthy();
    expect(getByText('Linen Shirts')).toBeTruthy();
    expect(getByLabelText("Trending men's categories")).toHaveProp('horizontal', true);
    expect(getByLabelText('Man wearing a blue linen shirt by the sea')).toBeTruthy();
  });
});
