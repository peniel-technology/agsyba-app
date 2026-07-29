import { fireEvent, render } from '@testing-library/react-native';

import { FootwearCollectionHero } from '@/features/products/components/FootwearCollectionHero';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));

describe('FootwearCollectionHero', () => {
  it('renders the campaign content and invokes its action', () => {
    const onShopPress = jest.fn();
    const { getAllByText, getByLabelText, getByText } = render(
      <FootwearCollectionHero onShopPress={onShopPress} />,
    );

    fireEvent.press(getByLabelText('Shop Now: Step Into Style'));

    expect(getAllByText('Step Into Style')).toHaveLength(2);
    expect(
      getByText('Premium footwear engineered for ultimate comfort and unmatched style.'),
    ).toBeTruthy();
    expect(onShopPress).toHaveBeenCalledTimes(1);
  });
});
