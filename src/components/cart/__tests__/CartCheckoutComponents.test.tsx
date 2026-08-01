import { fireEvent, render } from '@testing-library/react-native';

import { AppliedCouponCard } from '@/components/cart/AppliedCouponCard';
import { ApplyCouponCard } from '@/components/cart/ApplyCouponCard';
import { CartCheckoutBar } from '@/components/cart/CartCheckoutBar';
import { CartPriceDetails } from '@/components/cart/CartPriceDetails';
import { SelectAllCartItems } from '@/components/cart/SelectAllCartItems';

jest.mock('lucide-react-native', () => ({
  Check: 'Check',
  ChevronRight: 'ChevronRight',
  Minus: 'Minus',
  Ticket: 'Ticket',
}));

const price = { amount: 714.92, currency: 'AED' };
const discount = { amount: 134.6, currency: 'AED' };
const total = { amount: 580.32, currency: 'AED' };

describe('cart checkout components', () => {
  it('invokes coupon entry and editing actions', () => {
    const onApplyPress = jest.fn();
    const onEditPress = jest.fn();
    const { getByLabelText, getByText } = render(
      <>
        <ApplyCouponCard onPress={onApplyPress} />
        <AppliedCouponCard code="SAVE20" onEditPress={onEditPress} savings={discount} />
      </>,
    );

    fireEvent.press(getByLabelText('Apply coupon'));
    fireEvent.press(getByLabelText('Edit SAVE20 coupon'));

    expect(getByText('SAVE20 applied')).toBeTruthy();
    expect(getByText('AED 134.60 savings with this coupon')).toBeTruthy();
    expect(onApplyPress).toHaveBeenCalledTimes(1);
    expect(onEditPress).toHaveBeenCalledTimes(1);
  });

  it('renders calculated price details', () => {
    const { getByText } = render(
      <CartPriceDetails discount={discount} itemCount={4} price={price} total={total} />,
    );

    expect(getByText('Price Details (4 items)')).toBeTruthy();
    expect(getByText('AED 714.92')).toBeTruthy();
    expect(getByText('- AED 134.60')).toBeTruthy();
    expect(getByText('AED 580.32')).toBeTruthy();
  });

  it('invokes the checkout action', () => {
    const onCheckoutPress = jest.fn();
    const { getByLabelText } = render(
      <CartCheckoutBar onCheckoutPress={onCheckoutPress} total={total} />,
    );

    fireEvent.press(getByLabelText('Proceed to checkout'));

    expect(onCheckoutPress).toHaveBeenCalledTimes(1);
  });

  it('supports selecting and deselecting all cart products', () => {
    const onSelectionChange = jest.fn();
    const { getByLabelText, getByText, rerender } = render(
      <SelectAllCartItems
        isAllSelected={false}
        isPartiallySelected={false}
        onSelectionChange={onSelectionChange}
        productCount={4}
      />,
    );

    fireEvent.press(getByLabelText('Select all cart products'));
    expect(getByText('Select All (4 products)')).toBeTruthy();
    expect(onSelectionChange).toHaveBeenCalledTimes(1);

    rerender(
      <SelectAllCartItems
        isAllSelected
        isPartiallySelected={false}
        onSelectionChange={onSelectionChange}
        productCount={4}
      />,
    );

    fireEvent.press(getByLabelText('Deselect all cart products'));
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });
});
