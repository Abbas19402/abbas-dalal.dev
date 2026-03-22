import { create } from 'zustand';

export type CursorVariant = 'default' | 'text' | 'button' | 'sticky';
export type ThemeMode = 'default' | 'project-1' | 'project-2' | 'project-3' | 'project-4';

interface UIState {
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  
  currentTheme: ThemeMode;
  setCurrentTheme: (theme: ThemeMode) => void;
  
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  
  currentTheme: 'default',
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
