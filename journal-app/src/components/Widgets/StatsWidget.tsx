import React from 'react';
import { useJournalStore } from '../../store/journalStore';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export const StatsWidget: React.FC = () => {
  const { entries } = useJournalStore();
  
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthKey = format(currentMonth, 'yyyy-MM');
  
  // Filter entries for current month
  const currentMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= monthStart && entryDate <= monthEnd;
  });
  
  // Calculate mood distribution
  const moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  currentMonthEntries.forEach(entry => {
    moodCounts[entry.mood]++;
  });
  
  // Calculate average mood
  const totalMoodPoints = currentMonthEntries.reduce((sum, entry) => sum + entry.mood, 0);
  const averageMood = currentMonthEntries.length > 0 
    ? Math.round((totalMoodPoints / currentMonthEntries.length) * 10) / 10
    : 0;
  
  // Calculate word count
  const totalWords = currentMonthEntries.reduce((sum, entry) => {
    return sum + entry.content.split(/\s+/).filter(word => word.length > 0).length;
  }, 0);
  
  const averageWords = currentMonthEntries.length > 0 
    ? Math.round(totalWords / currentMonthEntries.length)
    : 0;

  const moodColors = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-green-500',
    5: 'bg-blue-500',
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = { 1: '😞', 2: '😕', 3: '😐', 4: '😊', 5: '😄' };
    return emojis[mood as keyof typeof emojis];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')} Stats
        </h3>
        <div className="text-2xl">📊</div>
      </div>
      
      <div className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{currentMonthEntries.length}</div>
            <div className="text-xs text-gray-600">Entries</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{averageMood || '-'}</div>
            <div className="text-xs text-gray-600">Avg Mood</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">{averageWords}</div>
            <div className="text-xs text-gray-600">Avg Words</div>
          </div>
        </div>
        
        {/* Mood Distribution */}
        {currentMonthEntries.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Mood Distribution</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(mood => {
                const count = moodCounts[mood as keyof typeof moodCounts];
                const percentage = (count / currentMonthEntries.length) * 100;
                
                return (
                  <div key={mood} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-sm">{getMoodEmoji(mood)}</span>
                      <span className="text-xs text-gray-600">{mood}</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${moodColors[mood as keyof typeof moodColors]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {currentMonthEntries.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm">No entries this month yet</p>
            <p className="text-xs">Start writing to see your stats!</p>
          </div>
        )}
      </div>
    </div>
  );
};