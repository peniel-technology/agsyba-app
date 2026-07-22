import { render } from '@testing-library/react-native';

import { Loader } from '@/components/loaders/Loader';

describe('Loader', () => {
  it('renders an accessible three-dot loader', () => {
    const { getAllByTestId, getByLabelText } = render(<Loader label="Loading products" />);

    expect(getByLabelText('Loading products')).toHaveProp('accessibilityRole', 'progressbar');
    expect(getAllByTestId('loader-dot')).toHaveLength(3);
  });
});
