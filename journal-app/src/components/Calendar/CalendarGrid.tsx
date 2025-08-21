import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { generateCalendarDays } from '../../utils/dateHelpers';
import { useJournalStore } from '../../store/journalStore';
import { JournalEntry } from '../../types/journal';

interface CalendarGridProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { entries } = useJournalStore();

  // Create a map for quick lookup of entries by date
  const entriesMap = new Map(
    entries.map((entry: JournalEntry) => [entry.date, { mood: entry.mood }])
  );

  const calendarDays = generateCalendarDays(currentMonth, entriesMap);
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Today
          </button>
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          →
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            onClick={onDateSelect}
            isSelected={selectedDate === day.date}
          />
        ))}
      </div>

      {/* Mood Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Mood Scale</h3>
        <div className="flex gap-2 text-xs">
          {[1, 2, 3, 4, 5].map(mood => (
            <div key={mood} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${mood === 1 ? 'bg-red-500' : mood === 2 ? 'bg-orange-500' : mood === 3 ? 'bg-yellow-500' : mood === 4 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <span className="text-gray-600">{mood}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};