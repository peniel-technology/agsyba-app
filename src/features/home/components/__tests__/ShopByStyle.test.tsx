import { fireEvent, render } from '@testing-library/react-native';

import { ShopByStyle } from '@/features/home/components/ShopByStyle';
import { styleCategories } from '@/features/home/constants/styleCategories';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));

describe('ShopByStyle', () => {
  it('renders every style and invokes its action', () => {
    const onCategoryPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ShopByStyle categories={styleCategories} onCategoryPress={onCategoryPress} />,
    );

    fireEvent.press(getByLabelText('Shop Now: Party Look'));

    expect(getByText('Shop by Style')).toBeTruthy();
    expect(getByText('Office Look')).toBeTruthy();
    expect(getByText('Vacation Look')).toBeTruthy();
    expect(onCategoryPress).toHaveBeenCalledWith(styleCategories[2]);
  });

  it('does not render when no styles are available', () => {
    const { queryByText } = render(<ShopByStyle categories={[]} />);

    expect(queryByText('Shop by Style')).toBeNull();
  });
});
