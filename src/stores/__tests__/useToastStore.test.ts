import { useToastStore } from '@/stores/useToastStore';

describe('useToastStore', () => {
  afterEach(() => {
    useToastStore.getState().hideToast();
  });

  it('shows a themed toast with a default duration', () => {
    useToastStore.getState().showToast({
      message: 'Enter a valid email address.',
      title: 'Check your email',
      tone: 'error',
    });

    expect(useToastStore.getState().toast).toEqual(
      expect.objectContaining({
        message: 'Enter a valid email address.',
        title: 'Check your email',
        tone: 'error',
      }),
    );
    expect(useToastStore.getState().toast?.durationMs).toBeGreaterThan(0);
  });

  it('dismisses the current toast', () => {
    useToastStore.getState().showToast({
      message: 'Something went wrong.',
      title: 'Unable to continue',
      tone: 'error',
    });

    useToastStore.getState().hideToast();

    expect(useToastStore.getState().toast).toBeNull();
  });
});
