import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('exposes an accessible label and invokes its press handler', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Continue" onPress={onPress} />);

    fireEvent.press(getByRole('button', { name: 'Continue' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
