import { fireEvent, render } from '@testing-library/react-native';

import { ShopByCategory } from '@/features/home/components/ShopByCategory';
import type { ShopCategory } from '@/features/home/types/shopCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: ShopCategory = {
  id: 'women',
  image: 1,
  imageAccessibilityLabel: 'Woman wearing an elegant white dress',
  name: 'Women',
};

describe('ShopByCategory', () => {
  it('renders category content and invokes its actions', () => {
    const onCategoryPress = jest.fn();
    const onViewAllPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ShopByCategory
        categories={[category]}
        onCategoryPress={onCategoryPress}
        onViewAllPress={onViewAllPress}
      />,
    );

    fireEvent.press(getByLabelText('Shop Women'));
    fireEvent.press(getByLabelText('View all categories'));

    expect(getByText('Shop by Category')).toBeTruthy();
    expect(getByText('Women')).toBeTruthy();
    expect(getByLabelText('Shopping categories')).toHaveProp('decelerationRate', 'normal');
    expect(onCategoryPress).toHaveBeenCalledWith(category);
    expect(onViewAllPress).toHaveBeenCalledTimes(1);
  });

  it('disables actions until destinations are provided', () => {
    const { getByLabelText } = render(<ShopByCategory categories={[category]} />);

    expect(getByLabelText('Shop Women')).toBeDisabled();
    expect(getByLabelText('View all categories')).toBeDisabled();
  });
});
