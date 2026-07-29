import { fireEvent, render } from '@testing-library/react-native';

import { ProductResultsLoader } from '@/components/loaders/ProductResultsLoader';

describe('ProductResultsLoader', () => {
  it('renders the result count and invokes its action', () => {
    const onLoadMore = jest.fn();
    const { getByLabelText, getByText } = render(
      <ProductResultsLoader displayedCount={8} onLoadMore={onLoadMore} totalCount={248} />,
    );

    fireEvent.press(getByLabelText('View more items'));

    expect(getByText('Showing 8 of 248')).toBeTruthy();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('disables loading when no action is configured', () => {
    const { getByLabelText } = render(<ProductResultsLoader displayedCount={8} totalCount={248} />);

    expect(getByLabelText('View more items')).toBeDisabled();
  });
});
