import { create } from 'zustand';
import { AppSettings } from '../types/journal';
import { DatabaseService } from '../services/database';

interface SettingsStore {
  settings: AppSettings;
  isLoading: boolean;
  
  // Actions
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: {
    theme: 'light',
    firstName: '',
  },
  isLoading: false,

  loadSettings: async () => {
    set({ isLoading: true });
    try {
      const settings = await DatabaseService.getSettings();
      set({ settings, isLoading: false });
    } catch (error) {
      console.error('Failed to load settings:', error);
      set({ isLoading: false });
    }
  },

  updateSettings: async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...get().settings, ...newSettings };
      await DatabaseService.updateSettings(updatedSettings);
      set({ settings: updatedSettings });
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  },
}));