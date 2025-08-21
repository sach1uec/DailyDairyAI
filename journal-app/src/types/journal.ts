export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  content: string;
  mood: MoodRating;
  createdAt: Date;
  updatedAt: Date;
}

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface SearchResult {
  entry: JournalEntry;
  score: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
}

export interface CalendarDay {
  date: string;
  hasEntry: boolean;
  mood?: MoodRating;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  firstName: string;
}