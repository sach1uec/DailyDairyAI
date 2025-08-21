import React from 'react';
import { SearchResult } from '../../types/journal';
import { formatDisplayDate, getMoodColor } from '../../utils/dateHelpers';

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (date: string) => void;
  isSearching: boolean;
  query: string;
}

const moodLabels = {
  1: 'Very Bad',
  2: 'Bad',
  3: 'Okay',
  4: 'Good', 
  5: 'Excellent'
};

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  onResultClick, 
  isSearching,
  query 
}) => {
  if (isSearching) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Searching...</div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8 text-gray-500">
          <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Search your journal entries</p>
          <p className="text-sm mt-2">Type to start searching...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8 text-gray-500">
          <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.077-2.33" />
          </svg>
          <p>No entries found</p>
          <p className="text-sm mt-2">Try different keywords</p>
        </div>
      </div>
    );
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Search Results ({results.length})
        </h3>
        <p className="text-sm text-gray-500">
          Showing results for "{query}"
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={result.entry.id}
            onClick={() => onResultClick(result.entry.date)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-gray-900">
                  {formatDisplayDate(result.entry.date)}
                </h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getMoodColor(result.entry.mood)}`}></div>
                  <span className="text-sm text-gray-500">{moodLabels[result.entry.mood]}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Match: {Math.round((1 - result.score) * 100)}%
              </div>
            </div>
            
            <div className="text-sm text-gray-600 line-clamp-3">
              {highlightText(result.entry.content, query)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};