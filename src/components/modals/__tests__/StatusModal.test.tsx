import { fireEvent, render } from '@testing-library/react-native';

import { StatusModal } from '@/components/modals/StatusModal';

jest.mock('lucide-react-native', () => ({
  CircleAlert: 'CircleAlert',
  CircleCheck: 'CircleCheck',
  X: 'X',
}));

describe('StatusModal', () => {
  it('shows an error and closes from its action', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <StatusModal
        isVisible
        message="Turn on device location services."
        onClose={onClose}
        title="Location unavailable"
        tone="error"
      />,
    );

    expect(getByText('Location unavailable')).toBeTruthy();
    expect(getByText('Turn on device location services.')).toBeTruthy();

    fireEvent.press(getByText('OK'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports a custom success action label', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <StatusModal
        actionLabel="Continue"
        isVisible
        message="Your delivery address is ready."
        onClose={onClose}
        title="Address saved"
        tone="success"
      />,
    );

    fireEvent.press(getByText('Continue'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('runs a separate primary action without invoking dismiss', () => {
    const onAction = jest.fn();
    const onClose = jest.fn();
    const { getByText } = render(
      <StatusModal
        isVisible
        message="Turn on device location services."
        onAction={onAction}
        onClose={onClose}
        title="Location unavailable"
        tone="error"
      />,
    );

    fireEvent.press(getByText('OK'));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });
});
