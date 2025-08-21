import Dexie, { Table } from 'dexie';
import { JournalEntry, AppSettings } from '../types/journal';

export class JournalDatabase extends Dexie {
  entries!: Table<JournalEntry>;
  settings!: Table<AppSettings>;

  constructor() {
    super('JournalDatabase');
    
    this.version(1).stores({
      entries: 'id, date, content, mood, createdAt, updatedAt',
      settings: 'theme, firstName'
    });
  }
}

export const db = new JournalDatabase();

export class DatabaseService {
  static async saveEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
    const now = new Date();
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    
    await db.entries.put(newEntry);
    return newEntry;
  }

  static async updateEntry(id: string, updates: Partial<Pick<JournalEntry, 'content' | 'mood'>>): Promise<void> {
    await db.entries.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  static async getEntry(date: string): Promise<JournalEntry | undefined> {
    return await db.entries.where('date').equals(date).first();
  }

  static async getAllEntries(): Promise<JournalEntry[]> {
    return await db.entries.orderBy('date').reverse().toArray();
  }

  static async getEntriesInRange(startDate: string, endDate: string): Promise<JournalEntry[]> {
    return await db.entries
      .where('date')
      .between(startDate, endDate, true, true)
      .toArray();
  }

  static async deleteEntry(id: string): Promise<void> {
    await db.entries.delete(id);
  }

  static async getSettings(): Promise<AppSettings> {
    const settings = await db.settings.toCollection().first();
    return settings || { theme: 'light', firstName: '' };
  }

  static async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    await db.settings.clear();
    await db.settings.add({ theme: 'light', firstName: '', ...settings });
  }
}