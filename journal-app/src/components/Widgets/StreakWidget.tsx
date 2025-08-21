import React from 'react';
import { useJournalStore } from '../../store/journalStore';
import { StreakService } from '../../services/streak';

export const StreakWidget: React.FC = () => {
  const { entries } = useJournalStore();
  const streakData = StreakService.calculateStreak(entries);
  const motivation = StreakService.getStreakMotivation(streakData.currentStreak);

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Writing Streak</h3>
        <div className="text-2xl">🔥</div>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            {streakData.currentStreak}
          </div>
          <div className="text-sm opacity-90">
            {streakData.currentStreak === 1 ? 'Day' : 'Days'} in a row
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xl font-semibold">{streakData.longestStreak}</div>
            <div className="text-xs opacity-90">Best Streak</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xl font-semibold">{streakData.totalEntries}</div>
            <div className="text-xs opacity-90">Total Entries</div>
          </div>
        </div>
        
        <div className="text-center text-sm opacity-90 font-medium">
          {motivation}
        </div>
      </div>
    </div>
  );
};