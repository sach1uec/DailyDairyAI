import { saveAs } from 'file-saver';
import { JournalEntry } from '../types/journal';
import { format } from 'date-fns';

export class ExportService {
  static exportToMarkdown(entries: JournalEntry[], fileName?: string): void {
    if (entries.length === 0) {
      throw new Error('No entries to export');
    }

    // Sort entries by date (oldest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let markdown = '# My Journal\n\n';
    markdown += `Exported on ${format(new Date(), 'MMMM d, yyyy')}\n`;
    markdown += `Total entries: ${entries.length}\n\n`;
    markdown += '---\n\n';

    // Group entries by year
    const entriesByYear = sortedEntries.reduce((acc, entry) => {
      const year = new Date(entry.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(entry);
      return acc;
    }, {} as Record<number, JournalEntry[]>);

    Object.keys(entriesByYear)
      .sort()
      .forEach(year => {
        markdown += `## ${year}\n\n`;
        
        entriesByYear[parseInt(year)].forEach(entry => {
          const date = new Date(entry.date);
          const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
          const moodEmoji = this.getMoodEmoji(entry.mood);
          
          markdown += `### ${formattedDate} ${moodEmoji}\n\n`;
          markdown += `**Mood:** ${entry.mood}/5\n\n`;
          markdown += `${entry.content}\n\n`;
          markdown += '---\n\n';
        });
      });

    // Add footer
    markdown += '\n\n*Exported from Daily Journal*\n';

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const defaultFileName = `journal-export-${format(new Date(), 'yyyy-MM-dd')}.md`;
    saveAs(blob, fileName || defaultFileName);
  }

  static exportDateRange(
    entries: JournalEntry[], 
    startDate: string, 
    endDate: string,
    fileName?: string
  ): void {
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    });

    if (filteredEntries.length === 0) {
      throw new Error('No entries found in the selected date range');
    }

    const defaultFileName = `journal-${startDate}-to-${endDate}.md`;
    this.exportToMarkdown(filteredEntries, fileName || defaultFileName);
  }

  static exportCurrentMonth(entries: JournalEntry[]): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const startDate = format(new Date(year, month, 1), 'yyyy-MM-dd');
    const endDate = format(new Date(year, month + 1, 0), 'yyyy-MM-dd');
    
    const monthName = format(now, 'MMMM-yyyy');
    const fileName = `journal-${monthName}.md`;
    
    this.exportDateRange(entries, startDate, endDate, fileName);
  }

  static exportCurrentYear(entries: JournalEntry[]): void {
    const year = new Date().getFullYear();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const fileName = `journal-${year}.md`;
    
    this.exportDateRange(entries, startDate, endDate, fileName);
  }

  private static getMoodEmoji(mood: number): string {
    const emojis = {
      1: '😞',
      2: '😕', 
      3: '😐',
      4: '😊',
      5: '😄'
    };
    return emojis[mood as keyof typeof emojis] || '😐';
  }

  static getExportStats(entries: JournalEntry[]): {
    totalEntries: number;
    dateRange: string;
    totalWords: number;
    averageMood: number;
  } {
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        dateRange: 'No entries',
        totalWords: 0,
        averageMood: 0
      };
    }

    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstDate = format(new Date(sortedEntries[0].date), 'MMM d, yyyy');
    const lastDate = format(new Date(sortedEntries[sortedEntries.length - 1].date), 'MMM d, yyyy');
    
    const totalWords = entries.reduce((sum, entry) => {
      return sum + entry.content.split(/\s+/).filter(word => word.length > 0).length;
    }, 0);

    const totalMoodPoints = entries.reduce((sum, entry) => sum + entry.mood, 0);
    const averageMood = Math.round((totalMoodPoints / entries.length) * 10) / 10;

    return {
      totalEntries: entries.length,
      dateRange: firstDate === lastDate ? firstDate : `${firstDate} - ${lastDate}`,
      totalWords,
      averageMood
    };
  }
}