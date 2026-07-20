import { create } from 'zustand';

type ThemePreference = 'system' | 'light' | 'dark';

interface UiState {
  themePreference: ThemePreference;
  setThemePreference: (themePreference: ThemePreference) => void;
}

export const useUiStore = create<UiState>((set) => ({
  themePreference: 'system',
  setThemePreference: (themePreference) => set({ themePreference }),
}));
