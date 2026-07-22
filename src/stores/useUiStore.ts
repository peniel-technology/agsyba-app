import { create } from 'zustand';

type ThemePreference = 'system' | 'light' | 'dark';

interface UiState {
  closeDrawer: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  themePreference: ThemePreference;
  setThemePreference: (themePreference: ThemePreference) => void;
}

export const useUiStore = create<UiState>((set) => ({
  closeDrawer: () => set({ isDrawerOpen: false }),
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  themePreference: 'system',
  setThemePreference: (themePreference) => set({ themePreference }),
}));
