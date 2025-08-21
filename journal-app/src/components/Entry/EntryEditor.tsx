import React, { useState, useEffect } from 'react';
import { MoodSelector } from './MoodSelector';
import { MoodRating } from '../../types/journal';
import { useJournalStore } from '../../store/journalStore';
import { formatDisplayDate } from '../../utils/dateHelpers';

interface EntryEditorProps {
  selectedDate: string;
}

export const EntryEditor: React.FC<EntryEditorProps> = ({ selectedDate }) => {
  const { getCurrentEntry, saveEntry, updateEntry } = useJournalStore();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodRating | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const existingEntry = getCurrentEntry(selectedDate);

  useEffect(() => {
    if (existingEntry) {
      setContent(existingEntry.content);
      setMood(existingEntry.mood);
    } else {
      setContent('');
      setMood(null);
    }
  }, [selectedDate, existingEntry]);

  const handleSave = async () => {
    if (!content.trim() || !mood) return;
    
    setIsSaving(true);
    try {
      if (existingEntry) {
        await updateEntry(existingEntry.id, content.trim(), mood);
      } else {
        await saveEntry(selectedDate, content.trim(), mood);
      }
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = content.trim().length > 0 && mood !== null;
  const hasChanges = existingEntry 
    ? (existingEntry.content !== content.trim() || existingEntry.mood !== mood)
    : (content.trim().length > 0 || mood !== null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {formatDisplayDate(selectedDate)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {existingEntry ? 'Edit your journal entry' : 'Create a new journal entry'}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="entry-content" className="block text-sm font-medium text-gray-700">
            How was your day?
          </label>
          <textarea
            id="entry-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day, thoughts, feelings, or anything you want to remember..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={2000}
          />
          <div className="text-right text-xs text-gray-500">
            {content.length}/2000 characters
          </div>
        </div>

        <MoodSelector selectedMood={mood} onMoodSelect={setMood} />

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={!isFormValid || !hasChanges || isSaving}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : existingEntry ? 'Update Entry' : 'Save Entry'}
          </button>
          
          {existingEntry && (
            <button
              onClick={() => {
                setContent(existingEntry.content);
                setMood(existingEntry.mood);
              }}
              disabled={!hasChanges}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};