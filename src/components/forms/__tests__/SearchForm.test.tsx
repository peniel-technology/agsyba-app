import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { SearchForm } from '@/components/forms/SearchForm';

jest.mock('lucide-react-native', () => ({ Search: 'Search' }));

describe('SearchForm', () => {
  it('reports query changes and submits a trimmed query', async () => {
    const onQueryChange = jest.fn();
    const onSubmit = jest.fn();
    const { getByLabelText } = render(
      <SearchForm onQueryChange={onQueryChange} onSubmit={onSubmit} />,
    );
    const input = getByLabelText('Search products and categories');

    fireEvent.changeText(input, '  footwear  ');
    fireEvent(input, 'submitEditing');

    expect(onQueryChange).toHaveBeenCalledWith('  footwear  ');
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('footwear'));
  });

  it('shows a validation error for an empty search', async () => {
    const { getByLabelText, getByRole } = render(<SearchForm onSubmit={jest.fn()} />);

    fireEvent(getByLabelText('Search products and categories'), 'submitEditing');

    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent('Enter a product or category to search'),
    );
  });
});
