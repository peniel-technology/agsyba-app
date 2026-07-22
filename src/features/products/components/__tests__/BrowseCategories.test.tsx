import { fireEvent, render } from '@testing-library/react-native';

import { BrowseCategories } from '@/features/products/components/BrowseCategories';
import type { BrowseCategory } from '@/features/products/types/browseCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));

const category: BrowseCategory = {
  id: 'footwear',
  image: 1,
  imageAccessibilityLabel: 'Brown leather boots',
  name: 'Footwear Collection',
};

describe('BrowseCategories', () => {
  it('renders category cards and invokes selection', () => {
    const onCategoryPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <BrowseCategories categories={[category]} onCategoryPress={onCategoryPress} />,
    );

    fireEvent.press(getByLabelText('Browse Footwear Collection'));

    expect(getByText('Browse Categories')).toBeTruthy();
    expect(getByLabelText('Brown leather boots')).toBeTruthy();
    expect(onCategoryPress).toHaveBeenCalledWith(category);
  });

  it('renders an empty state when no categories match', () => {
    const { getByText } = render(<BrowseCategories categories={[]} />);

    expect(getByText('No categories found')).toBeTruthy();
  });
});
