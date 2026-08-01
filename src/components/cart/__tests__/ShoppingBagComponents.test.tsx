import { fireEvent, render } from '@testing-library/react-native';

import { CartProductItem } from '@/components/cart/CartProductItem';
import { CheckoutProgress } from '@/components/cart/CheckoutProgress';
import { FreeShippingProgress } from '@/components/cart/FreeShippingProgress';
import { ShoppingBagEmptyState } from '@/components/cart/ShoppingBagEmptyState';
import { ShoppingBagHeader } from '@/components/cart/ShoppingBagHeader';
import type { ProductPreview } from '@/types/product';

jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  Bell: 'Bell',
  Check: 'Check',
  ChevronLeft: 'ChevronLeft',
  Minus: 'Minus',
  Plus: 'Plus',
  Search: 'Search',
  ShoppingBag: 'ShoppingBag',
}));

const product: ProductPreview = {
  bestPrice: { amount: 76, currency: 'AED' },
  brand: 'ZARA',
  deliveryLabel: 'Delivery by Jul 21',
  discountPercentage: 20,
  id: 'zara-dress',
  image: 1,
  imageAccessibilityLabel: 'Light blue dress',
  isFavorite: false,
  name: 'Pleated Chiffon Midi Dress',
  price: { amount: 95, currency: 'AED' },
  rating: 4.2,
  reviewCount: 128,
};

describe('shopping bag components', () => {
  it('renders the bag count and invokes the back action', () => {
    const onBackPress = jest.fn();
    const onSearchPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ShoppingBagHeader itemCount={4} onBackPress={onBackPress} onSearchPress={onSearchPress} />,
    );

    fireEvent.press(getByLabelText('Go back'));
    fireEvent.press(getByLabelText('Search products'));

    expect(getByText('Shopping Bag')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(onBackPress).toHaveBeenCalledTimes(1);
    expect(onSearchPress).toHaveBeenCalledTimes(1);
  });

  it('renders the empty-cart actions and invokes both destinations', () => {
    const onContinueShoppingPress = jest.fn();
    const onShopNowPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <ShoppingBagEmptyState
        onContinueShoppingPress={onContinueShoppingPress}
        onShopNowPress={onShopNowPress}
      />,
    );

    fireEvent.press(getByLabelText('Shop now'));
    fireEvent.press(getByLabelText('Continue shopping'));

    expect(getByText('Your Cart is Empty')).toBeTruthy();
    expect(onShopNowPress).toHaveBeenCalledTimes(1);
    expect(onContinueShoppingPress).toHaveBeenCalledTimes(1);
  });

  it('shows the active checkout step and free-shipping remainder', () => {
    const { getByLabelText, getByText } = render(
      <>
        <CheckoutProgress activeStep="cart" />
        <FreeShippingProgress currency="AED" subtotal={952} threshold={999} />
      </>,
    );

    expect(getByLabelText('Checkout step: cart')).toBeTruthy();
    expect(getByText('Add AED 47.00 more to enjoy FREE Shipping')).toBeTruthy();
    expect(getByLabelText('Free shipping progress, 95 percent')).toHaveAccessibilityValue({
      max: 100,
      min: 0,
      now: 95,
    });
  });

  it('invokes quantity and remove actions for a cart line', () => {
    const onDecreasePress = jest.fn();
    const onIncreasePress = jest.fn();
    const onMoveToWishlistPress = jest.fn();
    const onRemovePress = jest.fn();
    const onSelectionChange = jest.fn();
    const { getByLabelText } = render(
      <CartProductItem
        color="Navy"
        isSelected
        onDecreasePress={onDecreasePress}
        onIncreasePress={onIncreasePress}
        onMoveToWishlistPress={onMoveToWishlistPress}
        onRemovePress={onRemovePress}
        onSelectionChange={onSelectionChange}
        product={product}
        quantity={2}
        size="M"
      />,
    );

    fireEvent.press(getByLabelText(`Deselect ${product.name}`));
    fireEvent.press(getByLabelText(`Decrease ${product.name} quantity`));
    fireEvent.press(getByLabelText(`Increase ${product.name} quantity`));
    fireEvent.press(getByLabelText(`Remove ${product.name} from shopping bag`));
    fireEvent.press(getByLabelText(`Move ${product.name} to wishlist`));

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onDecreasePress).toHaveBeenCalledTimes(1);
    expect(onIncreasePress).toHaveBeenCalledTimes(1);
    expect(onRemovePress).toHaveBeenCalledTimes(1);
    expect(onMoveToWishlistPress).toHaveBeenCalledTimes(1);
  });
});
