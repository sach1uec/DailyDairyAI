import React, { useState } from 'react';
import { ExportService } from '../../services/export';
import { useJournalStore } from '../../store/journalStore';

interface HeaderProps {
  currentView: 'calendar' | 'search';
  onViewChange: (view: 'calendar' | 'search') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { entries } = useJournalStore();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (type: 'all' | 'month' | 'year') => {
    try {
      switch (type) {
        case 'all':
          ExportService.exportToMarkdown(entries);
          break;
        case 'month':
          ExportService.exportCurrentMonth(entries);
          break;
        case 'year':
          ExportService.exportCurrentYear(entries);
          break;
      }
      setShowExportMenu(false);
    } catch (error) {
      alert('Export failed: ' + (error as Error).message);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              📝 Daily Journal
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <button
              onClick={() => onViewChange('calendar')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'calendar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => onViewChange('search')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'search'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Search
            </button>
          </nav>

          {/* Export Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={entries.length === 0}
            >
              📥 Export
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleExport('all')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Export All Entries
                  </button>
                  <button
                    onClick={() => handleExport('month')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Export Current Month
                  </button>
                  <button
                    onClick={() => handleExport('year')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Export Current Year
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};