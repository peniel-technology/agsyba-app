import { fireEvent, render } from '@testing-library/react-native';

import { WomensCollectionHero } from '@/features/products/components/WomensCollectionHero';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));

describe('WomensCollectionHero', () => {
  it('renders the campaign content and invokes its action', () => {
    const onShopPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <WomensCollectionHero onShopPress={onShopPress} />,
    );

    fireEvent.press(getByLabelText('Shop Now: Women’s New Season'));

    expect(getByText('New Season')).toBeTruthy();
    expect(getByText('Women’s New Season')).toBeTruthy();
    expect(getByText("Explore the latest trends in premium women's fashion.")).toBeTruthy();
    expect(onShopPress).toHaveBeenCalledTimes(1);
  });
});
