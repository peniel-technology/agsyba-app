import { render } from '@testing-library/react-native';

import { KidsTrending } from '@/features/products/components/KidsTrending';
import type { CircularCategoryItem } from '@/types/circularCategory';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));

const category: CircularCategoryItem = {
  id: 'party-dresses',
  image: 1,
  imageAccessibilityLabel: 'Girl wearing a white party dress',
  name: 'Party Dresses',
};

describe('KidsTrending', () => {
  it("renders the shared circular section with kids' content", () => {
    const { getByLabelText, getByText } = render(<KidsTrending categories={[category]} />);

    expect(getByText("Trending in Kids'")).toBeTruthy();
    expect(getByText('Party Dresses')).toBeTruthy();
    expect(getByLabelText("Trending kids' categories")).toHaveProp('horizontal', true);
    expect(getByLabelText('Girl wearing a white party dress')).toBeTruthy();
  });
});
