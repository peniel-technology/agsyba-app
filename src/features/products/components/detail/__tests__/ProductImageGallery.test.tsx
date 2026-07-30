import { fireEvent, render } from '@testing-library/react-native';

import { ProductImageGallery } from '@/features/products/components/detail/ProductImageGallery';
import type { ProductDetailImage } from '@/features/products/types/productDetail';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('lucide-react-native', () => ({
  ChevronLeft: 'ChevronLeft',
  ChevronRight: 'ChevronRight',
  Heart: 'Heart',
  Share2: 'Share2',
}));

const images: readonly ProductDetailImage[] = [
  { accessibilityLabel: 'Front product view', id: 'front', source: 1 },
  { accessibilityLabel: 'Side product view', id: 'side', source: 2 },
];

describe('ProductImageGallery', () => {
  it('supports thumbnail selection and wishlist actions', () => {
    const onFavoritePress = jest.fn();
    const onSharePress = jest.fn();
    const { getByLabelText } = render(
      <ProductImageGallery
        images={images}
        isFavorite={false}
        onFavoritePress={onFavoritePress}
        onSharePress={onSharePress}
      />,
    );

    fireEvent.press(getByLabelText('Show Side product view'));
    fireEvent.press(getByLabelText('Add product to wishlist'));
    fireEvent.press(getByLabelText('Share product'));

    expect(getByLabelText('Show Side product view')).toHaveAccessibilityState({
      selected: true,
    });
    expect(getByLabelText('Image 2 of 2')).toBeTruthy();
    expect(onFavoritePress).toHaveBeenCalledTimes(1);
    expect(onSharePress).toHaveBeenCalledTimes(1);
  });
});
