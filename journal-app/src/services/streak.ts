import { JournalEntry, StreakData } from '../types/journal';
import { parseISO, differenceInDays, subDays, format } from 'date-fns';

export class StreakService {
  static calculateStreak(entries: JournalEntry[]): StreakData {
    if (entries.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: 0,
      };
    }

    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Create a set of dates that have entries
    const entryDates = new Set(sortedEntries.map(entry => entry.date));
    
    const today = new Date();
    const todayString = format(today, 'yyyy-MM-dd');
    
    // Calculate current streak
    let currentStreak = 0;
    let checkDate = today;
    
    // Start from today and work backwards
    while (true) {
      const dateString = format(checkDate, 'yyyy-MM-dd');
      
      if (entryDates.has(dateString)) {
        currentStreak++;
        checkDate = subDays(checkDate, 1);
      } else {
        // If today doesn't have an entry, check yesterday to allow for ongoing streaks
        if (currentStreak === 0 && dateString === todayString) {
          checkDate = subDays(checkDate, 1);
          continue;
        }
        break;
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Convert dates to a sorted array for easier processing
    const sortedDates = Array.from(entryDates).sort();
    
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = parseISO(sortedDates[i - 1]);
        const currentDate = parseISO(sortedDates[i]);
        const daysDiff = differenceInDays(currentDate, prevDate);
        
        if (daysDiff === 1) {
          // Consecutive days
          tempStreak++;
        } else {
          // Gap in entries
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    
    return {
      currentStreak,
      longestStreak,
      totalEntries: entries.length,
    };
  }

  static getStreakMotivation(streak: number): string {
    if (streak === 0) return "Start your journaling journey today! 🌱";
    if (streak === 1) return "Great start! Keep the momentum going! 🚀";
    if (streak < 7) return `${streak} days strong! You're building a habit! 💪`;
    if (streak < 30) return `${streak} days in a row! Amazing consistency! 🔥`;
    if (streak < 100) return `${streak} days! You're a journaling champion! 🏆`;
    return `${streak} days! Absolutely incredible dedication! 🌟`;
  }
}