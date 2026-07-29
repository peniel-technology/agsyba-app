import { fireEvent, render } from '@testing-library/react-native';

import { MensCollectionFilters } from '@/features/products/components/MensCollectionFilters';

jest.mock('lucide-react-native', () => ({
  ChevronDown: 'ChevronDown',
  Funnel: 'Funnel',
}));

describe('MensCollectionFilters', () => {
  it('changes the selected category', () => {
    const onCategoryChange = jest.fn();
    const { getByLabelText } = render(
      <MensCollectionFilters onCategoryChange={onCategoryChange} selectedCategory="All" />,
    );

    fireEvent.press(getByLabelText('Show Shirts products'));

    expect(getByLabelText('Show All products')).toHaveAccessibilityState({ selected: true });
    expect(onCategoryChange).toHaveBeenCalledWith('Shirts');
  });

  it('invokes the filter controls', () => {
    const onCategoryChange = jest.fn();
    const onDropdownPress = jest.fn();
    const onFilterPress = jest.fn();
    const { getByLabelText } = render(
      <MensCollectionFilters
        onCategoryChange={onCategoryChange}
        onDropdownPress={onDropdownPress}
        onFilterPress={onFilterPress}
        selectedCategory="All"
      />,
    );

    fireEvent.press(getByLabelText('Open product filters'));
    fireEvent.press(getByLabelText('Open size options'));

    expect(onFilterPress).toHaveBeenCalledTimes(1);
    expect(onDropdownPress).toHaveBeenCalledWith('size');
  });

  it('disables controls without configured actions', () => {
    const { getByLabelText } = render(
      <MensCollectionFilters onCategoryChange={jest.fn()} selectedCategory="All" />,
    );

    expect(getByLabelText('Open product filters')).toBeDisabled();
    expect(getByLabelText('Open sort by options')).toBeDisabled();
  });
});
