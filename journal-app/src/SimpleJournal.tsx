import React, { useState } from 'react';

// Simple types defined locally
interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const getMoodEmoji = (mood: number) => {
  const emojis = { 1: '😞', 2: '😕', 3: '😐', 4: '😊', 5: '😄' };
  return emojis[mood as keyof typeof emojis];
};

const getMoodColor = (mood: number) => {
  const colors = {
    1: 'from-red-400 to-red-600',
    2: 'from-orange-400 to-orange-600', 
    3: 'from-yellow-400 to-yellow-600',
    4: 'from-green-400 to-green-600',
    5: 'from-blue-400 to-blue-600'
  };
  return colors[mood as keyof typeof colors];
};

export const SimpleJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentEntry = entries.find(e => e.date === selectedDate);
  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const handleSave = () => {
    if (!content.trim() || !mood) return;
    
    const newEntry: JournalEntry = {
      id: currentEntry?.id || Math.random().toString(36),
      date: selectedDate,
      content: content.trim(),
      mood: mood,
      createdAt: currentEntry?.createdAt || new Date().toISOString()
    };

    if (currentEntry) {
      setEntries(prev => prev.map(e => e.id === currentEntry.id ? newEntry : e));
    } else {
      setEntries(prev => [...prev, newEntry]);
    }
    
    setContent('');
    setMood(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (currentEntry) {
      setContent(currentEntry.content);
      setMood(currentEntry.mood);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setContent('');
    setMood(null);
    setIsEditing(false);
  };

  // Get recent entries for the activity feed
  const recentEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📝 Daily Journal
            </h1>
            <p className="text-gray-600">Capture your thoughts, track your moods</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Date Selection & Quick Stats */}
          <div className="xl:col-span-1 space-y-6">
            {/* Date Picker */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📅 Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setContent('');
                  setMood(null);
                  setIsEditing(false);
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
              {isToday && (
                <div className="mt-3 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  📍 Today
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📊 Your Stats</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  <div className="text-3xl font-bold">{entries.length}</div>
                  <div className="text-sm opacity-90">Total Entries</div>
                </div>
                {entries.length > 0 && (
                  <div className="text-center p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg text-white">
                    <div className="text-2xl font-bold">
                      {(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)}
                    </div>
                    <div className="text-sm opacity-90">Average Mood</div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            {recentEntries.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">🕒 Recent Entries</h2>
                <div className="space-y-3">
                  {recentEntries.map(entry => (
                    <div 
                      key={entry.id} 
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedDate(entry.date)}
                    >
                      <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {entry.content.substring(0, 30)}...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {formatDate(selectedDate)}
                </h2>
                <p className="text-gray-600 mt-1">
                  {currentEntry ? 'Your journal entry' : 'What happened today?'}
                </p>
              </div>

              <div className="p-6">
                {/* Existing Entry Display */}
                {currentEntry && !isEditing && (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-xl bg-gradient-to-r ${getMoodColor(currentEntry.mood)} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{getMoodEmoji(currentEntry.mood)}</div>
                          <div>
                            <div className="font-semibold">Mood: {currentEntry.mood}/5</div>
                            <div className="text-sm opacity-90">
                              {['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'][currentEntry.mood - 1]}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleEdit}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                        {currentEntry.content}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 border-t pt-4">
                      Created: {new Date(currentEntry.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Entry Form */}
                {(!currentEntry || isEditing) && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        📝 How was your day?
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write about your day, thoughts, feelings, or anything you want to remember..."
                        className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:outline-none transition-colors text-lg leading-relaxed"
                        maxLength={2000}
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {content.length}/2000 characters
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-6">
                        😊 How do you feel? (1-5)
                      </label>
                      <div className="flex gap-4 justify-center mb-8">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <div key={rating} className="flex flex-col items-center">
                            <button
                              onClick={() => setMood(rating as 1 | 2 | 3 | 4 | 5)}
                              className={`w-16 h-16 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-110 hover:shadow-lg ${
                                mood === rating ? 'ring-4 ring-gray-800 ring-offset-2 scale-105 shadow-lg' : 'hover:shadow-md'
                              } ${
                                rating === 1 ? 'bg-gradient-to-br from-red-400 to-red-600' :
                                rating === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                                rating === 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                rating === 4 ? 'bg-gradient-to-br from-green-400 to-green-600' : 
                                'bg-gradient-to-br from-blue-400 to-blue-600'
                              }`}
                            >
                              <div className="text-2xl">{getMoodEmoji(rating)}</div>
                            </button>
                            <div className="text-xs text-gray-600 mt-2 text-center font-medium">
                              {['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'][rating - 1]}
                            </div>
                          </div>
                        ))}
                      </div>
                      {mood && (
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            Selected mood: <span className="font-bold text-blue-600">
                              {getMoodEmoji(mood)} {['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'][mood - 1]}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-gray-100">
                      <button
                        onClick={handleSave}
                        disabled={!content.trim() || !mood}
                        className={`flex-1 relative overflow-hidden py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                          !content.trim() || !mood
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] shadow-lg'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="text-2xl">
                            {currentEntry ? '✏️' : '💾'}
                          </div>
                          <span>
                            {currentEntry ? 'Update Entry' : 'Save Entry'}
                          </span>
                        </div>
                        
                        {/* Animated background shine effect */}
                        {content.trim() && mood && (
                          <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"></div>
                        )}
                      </button>
                      
                      {isEditing && (
                        <button
                          onClick={handleCancel}
                          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <div className="flex items-center gap-2">
                            <span>❌</span>
                            <span>Cancel</span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};