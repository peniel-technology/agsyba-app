import { fireEvent, render } from '@testing-library/react-native';

import { ProductFilterPanel } from '@/features/products/components/filters/ProductFilterPanel';
import {
  createEmptyProductFilterSelections,
  productFilterSections,
} from '@/features/products/constants/productFilterSections';

jest.mock('lucide-react-native', () => ({
  Check: 'Check',
}));

describe('ProductFilterPanel', () => {
  it('changes sections and reports selected filter options', () => {
    const onOptionPress = jest.fn();
    const onSectionPress = jest.fn();
    const selections = {
      ...createEmptyProductFilterSelections(),
      quickFilters: ['top-rated'],
    };
    const { getByLabelText } = render(
      <ProductFilterPanel
        activeSectionId="quickFilters"
        onOptionPress={onOptionPress}
        onSectionPress={onSectionPress}
        sections={productFilterSections}
        selections={selections}
      />,
    );

    expect(getByLabelText('Remove Top Rated filter')).toHaveAccessibilityState({
      checked: true,
    });

    fireEvent.press(getByLabelText('Show Size filters'));
    fireEvent.press(getByLabelText('Select Top Brands filter'));

    expect(onSectionPress).toHaveBeenCalledWith('size');
    expect(onOptionPress).toHaveBeenCalledWith('quickFilters', 'top-brands');
  });
});
