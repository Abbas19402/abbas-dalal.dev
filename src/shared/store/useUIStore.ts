import { create } from 'zustand';

export type CursorVariant = 'default' | 'text' | 'button' | 'sticky';
export type ThemeMode = 'default' | 'project-1' | 'project-2' | 'project-3' | 'project-4';

interface UIState {
  // Cursor state
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  
  // Theme state (for background color transitions)
  currentTheme: ThemeMode;
  setCurrentTheme: (theme: ThemeMode) => void;
  
  // Menu state
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  
  // Preloader state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  
  // Theme
  currentTheme: 'default',
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  
  // Menu
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  
  // Preloader
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
