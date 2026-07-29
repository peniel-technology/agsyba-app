import { fireEvent, render } from '@testing-library/react-native';

import { KidsCollectionHero } from '@/features/products/components/KidsCollectionHero';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));

describe('KidsCollectionHero', () => {
  it('renders the campaign content and invokes its action', () => {
    const onShopPress = jest.fn();
    const { getByLabelText, getByText } = render(<KidsCollectionHero onShopPress={onShopPress} />);

    fireEvent.press(getByLabelText("Shop Now: Kids' New Season"));

    expect(getByText('New Season')).toBeTruthy();
    expect(getByText("Kids' New Season")).toBeTruthy();
    expect(
      getByText('Adorable styles and play-ready premium fashion for your little ones.'),
    ).toBeTruthy();
    expect(onShopPress).toHaveBeenCalledTimes(1);
  });
});
