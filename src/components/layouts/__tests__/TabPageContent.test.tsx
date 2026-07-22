import { render } from '@testing-library/react-native';

import { TabPageContent } from '@/components/layouts/TabPageContent';
import { Text } from '@/components/ui/Text';

describe('TabPageContent', () => {
  it('overlays the loader without unmounting page content', () => {
    const { getByLabelText, getByText } = render(
      <TabPageContent isLoading loadingLabel="Loading category page">
        <Text>Category content</Text>
      </TabPageContent>,
    );

    expect(getByText('Category content')).toBeTruthy();
    expect(getByLabelText('Loading category page')).toBeTruthy();
  });

  it('removes the loader when the page is ready', () => {
    const { queryByLabelText } = render(
      <TabPageContent isLoading={false} loadingLabel="Loading home page">
        <Text>Home content</Text>
      </TabPageContent>,
    );

    expect(queryByLabelText('Loading home page')).toBeNull();
  });
});
