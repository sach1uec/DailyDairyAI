import { create } from 'zustand';
import { JournalEntry, MoodRating } from '../types/journal';
import { DatabaseService } from '../services/database';

interface JournalStore {
  entries: JournalEntry[];
  currentEntry: JournalEntry | null;
  selectedDate: string;
  isLoading: boolean;
  
  // Actions
  loadEntries: () => Promise<void>;
  saveEntry: (date: string, content: string, mood: MoodRating) => Promise<void>;
  updateEntry: (id: string, content: string, mood: MoodRating) => Promise<void>;
  setSelectedDate: (date: string) => void;
  getCurrentEntry: (date: string) => JournalEntry | undefined;
  deleteEntry: (id: string) => Promise<void>;
}

export const useJournalStore = create<JournalStore>((set, get) => ({
  entries: [],
  currentEntry: null,
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,

  loadEntries: async () => {
    set({ isLoading: true });
    try {
      const entries = await DatabaseService.getAllEntries();
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load entries:', error);
      set({ isLoading: false });
    }
  },

  saveEntry: async (date: string, content: string, mood: MoodRating) => {
    try {
      const newEntry = await DatabaseService.saveEntry({
        date,
        content,
        mood,
      });
      
      set(state => ({
        entries: [newEntry, ...state.entries.filter(e => e.date !== date)].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }));
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  },

  updateEntry: async (id: string, content: string, mood: MoodRating) => {
    try {
      await DatabaseService.updateEntry(id, { content, mood });
      
      set(state => ({
        entries: state.entries.map(entry =>
          entry.id === id
            ? { ...entry, content, mood, updatedAt: new Date() }
            : entry
        )
      }));
    } catch (error) {
      console.error('Failed to update entry:', error);
    }
  },

  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },

  getCurrentEntry: (date: string) => {
    return get().entries.find(entry => entry.date === date);
  },

  deleteEntry: async (id: string) => {
    try {
      await DatabaseService.deleteEntry(id);
      set(state => ({
        entries: state.entries.filter(entry => entry.id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  },
}));