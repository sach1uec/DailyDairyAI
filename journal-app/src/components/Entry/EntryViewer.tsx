import React from 'react';
import { JournalEntry } from '../../types/journal';
import { formatDisplayDate } from '../../utils/dateHelpers';
import { getMoodColor } from '../../utils/dateHelpers';

interface EntryViewerProps {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}

const moodLabels = {
  1: 'Very Bad',
  2: 'Bad',
  3: 'Okay', 
  4: 'Good',
  5: 'Excellent'
};

export const EntryViewer: React.FC<EntryViewerProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {formatDisplayDate(entry.date)}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Mood:</span>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getMoodColor(entry.mood)}`}></div>
              <span className="text-sm font-medium">{moodLabels[entry.mood]}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {entry.content}
        </div>
      </div>

      <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div>Created: {entry.createdAt.toLocaleDateString()} at {entry.createdAt.toLocaleTimeString()}</div>
        {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
          <div>Updated: {entry.updatedAt.toLocaleDateString()} at {entry.updatedAt.toLocaleTimeString()}</div>
        )}
      </div>
    </div>
  );
};