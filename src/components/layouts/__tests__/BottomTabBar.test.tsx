import { fireEvent, render } from '@testing-library/react-native';

import { BottomTabBar } from '@/components/layouts/BottomTabBar';

jest.mock('lucide-react-native', () => ({
  Grid3X3: 'Grid3X3',
  Heart: 'Heart',
  Home: 'Home',
  ShoppingBag: 'ShoppingBag',
  UserRound: 'UserRound',
}));

describe('BottomTabBar', () => {
  it('marks the active tab and invokes tab changes', () => {
    const onTabPress = jest.fn();
    const { getByLabelText } = render(<BottomTabBar activeTab="home" onTabPress={onTabPress} />);

    fireEvent.press(getByLabelText('Category tab'));

    expect(getByLabelText('Home tab')).toHaveAccessibilityState({ selected: true });
    expect(onTabPress).toHaveBeenCalledWith('category');
  });

  it('disables destinations until navigation handlers are provided', () => {
    const { getByLabelText } = render(<BottomTabBar activeTab="home" />);

    expect(getByLabelText('Shop tab')).toBeDisabled();
  });
});
