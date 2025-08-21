import Fuse from 'fuse.js';
import { JournalEntry, SearchResult } from '../types/journal';

export class SearchService {
  private fuse: Fuse<JournalEntry>;

  constructor(entries: JournalEntry[]) {
    const options = {
      keys: ['content', 'date'],
      threshold: 0.3, // 0 = perfect match, 1 = match anything
      includeScore: true,
      minMatchCharLength: 2,
    };
    
    this.fuse = new Fuse(entries, options);
  }

  search(query: string): SearchResult[] {
    if (!query.trim()) return [];
    
    const results = this.fuse.search(query);
    
    return results.map(result => ({
      entry: result.item,
      score: result.score || 0,
    })).slice(0, 10); // Limit to 10 results
  }

  updateEntries(entries: JournalEntry[]) {
    this.fuse.setCollection(entries);
  }
}