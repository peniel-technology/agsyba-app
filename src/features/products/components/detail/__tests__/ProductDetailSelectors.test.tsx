import { fireEvent, render } from '@testing-library/react-native';

import { ProductColorSelector } from '@/features/products/components/detail/ProductColorSelector';
import { ProductQuantitySelector } from '@/features/products/components/detail/ProductQuantitySelector';
import { ProductSizeSelector } from '@/features/products/components/detail/ProductSizeSelector';
import type { ProductColorOption } from '@/features/products/types/productDetail';

jest.mock('lucide-react-native', () => ({ Minus: 'Minus', Plus: 'Plus' }));

const colors: readonly ProductColorOption[] = [
  { id: 'beige', label: 'Beige', swatchClassName: 'bg-stone-300' },
  { id: 'red', label: 'Red', swatchClassName: 'bg-brand' },
];

describe('Product detail selectors', () => {
  it('supports color and size selection', () => {
    const onColorChange = jest.fn();
    const onSizeChange = jest.fn();
    const { getByLabelText } = render(
      <>
        <ProductColorSelector
          colors={colors}
          onColorChange={onColorChange}
          selectedColorId="beige"
        />
        <ProductSizeSelector onSizeChange={onSizeChange} selectedSize="M" sizes={['S', 'M', 'L']} />
      </>,
    );

    fireEvent.press(getByLabelText('Select Red color'));
    fireEvent.press(getByLabelText('Select size L'));

    expect(onColorChange).toHaveBeenCalledWith('red');
    expect(onSizeChange).toHaveBeenCalledWith('L');
  });

  it('enforces the minimum quantity and supports incrementing', () => {
    const onQuantityChange = jest.fn();
    const { getByLabelText } = render(
      <ProductQuantitySelector onQuantityChange={onQuantityChange} quantity={1} />,
    );

    expect(getByLabelText('Decrease quantity')).toBeDisabled();
    fireEvent.press(getByLabelText('Increase quantity'));

    expect(onQuantityChange).toHaveBeenCalledWith(2);
  });
});
