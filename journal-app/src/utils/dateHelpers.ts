import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addDays, subDays, parseISO } from 'date-fns';
import { CalendarDay } from '../types/journal';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
};

export const generateCalendarDays = (currentDate: Date, entries: Map<string, { mood: number }>): CalendarDay[] => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  
  // Get the start of the week for the first day of the month
  const firstDayOfWeek = start.getDay();
  const calendarStart = subDays(start, firstDayOfWeek);
  
  // Generate 42 days (6 weeks × 7 days) to fill the calendar grid
  const calendarDays: CalendarDay[] = [];
  
  for (let i = 0; i < 42; i++) {
    const date = addDays(calendarStart, i);
    const dateString = formatDate(date);
    const entry = entries.get(dateString);
    
    calendarDays.push({
      date: dateString,
      hasEntry: !!entry,
      mood: entry?.mood as 1 | 2 | 3 | 4 | 5 | undefined,
      isToday: isToday(date),
      isCurrentMonth: isSameMonth(date, currentDate),
    });
  }
  
  return calendarDays;
};

export const getMoodColor = (mood: number): string => {
  const colors = {
    1: 'bg-red-500',
    2: 'bg-orange-500', 
    3: 'bg-yellow-500',
    4: 'bg-green-500',
    5: 'bg-blue-500',
  };
  return colors[mood as keyof typeof colors] || 'bg-gray-200';
};

export const getToday = (): string => {
  return formatDate(new Date());
};