import React from 'react';
import { MoodRating } from '../../types/journal';

interface MoodSelectorProps {
  selectedMood: MoodRating | null;
  onMoodSelect: (mood: MoodRating) => void;
}

const moodLabels = {
  1: 'Very Bad',
  2: 'Bad', 
  3: 'Okay',
  4: 'Good',
  5: 'Excellent'
};

const moodColors = {
  1: 'bg-red-500 hover:bg-red-600',
  2: 'bg-orange-500 hover:bg-orange-600',
  3: 'bg-yellow-500 hover:bg-yellow-600', 
  4: 'bg-green-500 hover:bg-green-600',
  5: 'bg-blue-500 hover:bg-blue-600'
};

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        How was your day? (1-5)
      </label>
      
      <div className="flex gap-2">
        {([1, 2, 3, 4, 5] as MoodRating[]).map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`
              flex flex-col items-center justify-center w-16 h-16 rounded-lg text-white text-sm font-medium transition-all
              ${moodColors[mood]}
              ${selectedMood === mood ? 'ring-2 ring-gray-800 scale-105' : ''}
            `}
            title={moodLabels[mood]}
          >
            <span className="text-lg">{mood}</span>
            <span className="text-xs mt-1">{moodLabels[mood]}</span>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <p className="text-sm text-gray-600">
          Selected: {moodLabels[selectedMood]}
        </p>
      )}
    </div>
  );
};