import React from 'react';
import { CalendarDay as CalendarDayType } from '../../types/journal';
import { getMoodColor } from '../../utils/dateHelpers';

interface CalendarDayProps {
  day: CalendarDayType;
  onClick: (date: string) => void;
  isSelected: boolean;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ day, onClick, isSelected }) => {
  const dayNumber = new Date(day.date).getDate();
  
  const baseClasses = "w-10 h-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors";
  
  let dayClasses = baseClasses;
  
  if (!day.isCurrentMonth) {
    dayClasses += " text-gray-400";
  } else if (day.isToday) {
    dayClasses += " ring-2 ring-blue-500 font-bold";
  }
  
  if (isSelected) {
    dayClasses += " ring-2 ring-purple-500";
  }
  
  if (day.hasEntry && day.mood) {
    dayClasses += ` ${getMoodColor(day.mood)} text-white`;
  } else if (day.hasEntry) {
    dayClasses += " bg-gray-300 text-gray-700";
  } else {
    dayClasses += " hover:bg-gray-100";
  }

  return (
    <button
      className={dayClasses}
      onClick={() => onClick(day.date)}
      title={day.hasEntry ? `Entry exists${day.mood ? ` (mood: ${day.mood})` : ''}` : 'No entry'}
    >
      {dayNumber}
    </button>
  );
};