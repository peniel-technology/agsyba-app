import { fireEvent, render } from '@testing-library/react-native';

import { HeroCarousel } from '@/features/home/components/HeroCarousel';
import type { HeroSlide } from '@/features/home/types';

jest.mock('expo-image', () => ({ Image: 'ExpoImage' }));
jest.mock('expo-linear-gradient', () => ({ LinearGradient: 'LinearGradient' }));
jest.mock('lucide-react-native', () => ({ ChevronRight: 'ChevronRight' }));
jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated'),
  scrollTo: jest.fn(),
}));

const slide: HeroSlide = {
  id: 'summer-collection',
  eyebrow: 'New Arrival',
  title: 'Summer\nCollection 2025',
  callToActionLabel: 'Shop Now',
  image: 1,
  imageAccessibilityLabel: 'Summer collection campaign',
};

describe('HeroCarousel', () => {
  it('renders campaign content and invokes its action', () => {
    const onSlidePress = jest.fn();
    const { getByLabelText, getByText } = render(
      <HeroCarousel onSlidePress={onSlidePress} slides={[slide]} />,
    );

    fireEvent.press(getByLabelText('Shop Now: Summer Collection 2025'));

    expect(getByText('New Arrival')).toBeTruthy();
    expect(getByText('Summer\nCollection 2025')).toBeTruthy();
    expect(onSlidePress).toHaveBeenCalledWith(slide);
  });

  it('disables the action until a destination is provided', () => {
    const { getByLabelText } = render(<HeroCarousel slides={[slide]} />);

    expect(getByLabelText('Shop Now: Summer Collection 2025')).toBeDisabled();
  });
});
