import { render } from '@testing-library/react-native';

import { CollectionRefreshLoader } from '@/components/loaders/CollectionRefreshLoader';

describe('CollectionRefreshLoader', () => {
  it('shows the shared three-dot loader while refreshing', () => {
    const { getAllByTestId, getByLabelText } = render(
      <CollectionRefreshLoader isVisible label="Refreshing products" />,
    );

    expect(getByLabelText('Refreshing products')).toHaveProp('accessibilityRole', 'progressbar');
    expect(getAllByTestId('loader-dot')).toHaveLength(3);
  });

  it('renders nothing when refresh is inactive', () => {
    const { queryByLabelText } = render(
      <CollectionRefreshLoader isVisible={false} label="Refreshing products" />,
    );

    expect(queryByLabelText('Refreshing products')).toBeNull();
  });
});
