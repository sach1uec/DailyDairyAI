import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Layout } from './components/Layout/Layout';
import { CalendarGrid } from './components/Calendar/CalendarGrid';
import { EntryEditor } from './components/Entry/EntryEditor';
import { EntryViewer } from './components/Entry/EntryViewer';
import { SearchBar } from './components/Search/SearchBar';
import { SearchResults } from './components/Search/SearchResults';
import { StreakWidget } from './components/Widgets/StreakWidget';
import { StatsWidget } from './components/Widgets/StatsWidget';
import { useJournalStore } from './store/journalStore';
import { useSearch } from './hooks/useSearch';
import { getToday } from './utils/dateHelpers';

type ViewType = 'calendar' | 'search';
type EntryMode = 'view' | 'edit';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('calendar');
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [entryMode, setEntryMode] = useState<EntryMode>('edit');
  
  const { loadEntries, getCurrentEntry, deleteEntry } = useJournalStore();
  const { query, results, isSearching, search } = useSearch();
  
  const currentEntry = getCurrentEntry(selectedDate);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCurrentView('calendar');
    setEntryMode(currentEntry ? 'view' : 'edit');
  };

  const handleSearchResultClick = (date: string) => {
    setSelectedDate(date);
    setCurrentView('calendar');
    setEntryMode('view');
  };

  const handleEntryDelete = async () => {
    if (currentEntry && confirm('Are you sure you want to delete this entry?')) {
      await deleteEntry(currentEntry.id);
      setEntryMode('edit');
    }
  };

  const renderCalendarView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Column - Calendar */}
      <div className="lg:col-span-1">
        <CalendarGrid
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </div>

      {/* Middle Column - Entry Editor/Viewer */}
      <div className="lg:col-span-2">
        {currentEntry && entryMode === 'view' ? (
          <EntryViewer
            entry={currentEntry}
            onEdit={() => setEntryMode('edit')}
            onDelete={handleEntryDelete}
          />
        ) : (
          <EntryEditor selectedDate={selectedDate} />
        )}
      </div>

      {/* Right Column - Widgets */}
      <div className="lg:col-span-1 space-y-6">
        <StreakWidget />
        <StatsWidget />
      </div>
    </div>
  );

  const renderSearchView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <SearchBar onSearch={search} />
      </div>
      <SearchResults
        results={results}
        onResultClick={handleSearchResultClick}
        isSearching={isSearching}
        query={query}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <Layout>
        {currentView === 'calendar' ? renderCalendarView() : renderSearchView()}
      </Layout>
    </div>
  );
}

export default App;