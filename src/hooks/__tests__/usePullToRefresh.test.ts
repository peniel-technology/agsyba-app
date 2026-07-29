import { act, renderHook, waitFor } from '@testing-library/react-native';

import { usePullToRefresh } from '@/hooks/usePullToRefresh';

describe('usePullToRefresh', () => {
  it('runs the refresh action and clears the refreshing state', async () => {
    const onRefresh = jest.fn(async () => Promise.resolve());
    const { result } = renderHook(() => usePullToRefresh(onRefresh, 0));

    await act(async () => {
      await result.current.refresh();
    });

    expect(onRefresh).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(result.current.isRefreshing).toBe(false));
  });

  it('exposes the refreshing state while the refresh action is pending', async () => {
    let resolveRefresh: (() => void) | undefined;
    const onRefresh = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve;
        }),
    );
    const { result } = renderHook(() => usePullToRefresh(onRefresh, 0));

    act(() => {
      void result.current.refresh();
    });

    expect(result.current.isRefreshing).toBe(true);

    await act(async () => {
      resolveRefresh?.();
    });

    await waitFor(() => expect(result.current.isRefreshing).toBe(false));
  });
});
