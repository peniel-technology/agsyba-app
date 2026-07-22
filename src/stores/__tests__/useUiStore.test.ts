import { useUiStore } from '@/stores/useUiStore';

describe('useUiStore', () => {
  afterEach(() => {
    useUiStore.getState().closeDrawer();
  });

  it('opens and closes the navigation drawer', () => {
    useUiStore.getState().openDrawer();

    expect(useUiStore.getState().isDrawerOpen).toBe(true);

    useUiStore.getState().closeDrawer();

    expect(useUiStore.getState().isDrawerOpen).toBe(false);
  });
});
