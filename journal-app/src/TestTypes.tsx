import React from 'react';

// Define types directly in this file to test
interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

export const TestTypes: React.FC = () => {
  const testEntry: JournalEntry = {
    id: '1',
    date: '2023-12-25',
    content: 'Test entry',
    mood: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Type Test</h2>
      <p>Entry ID: {testEntry.id}</p>
      <p>Date: {testEntry.date}</p>
      <p>Mood: {testEntry.mood}</p>
    </div>
  );
};