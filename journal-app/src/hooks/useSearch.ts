import { useState, useEffect, useMemo } from 'react';
import { SearchService } from '../services/search';
import { useJournalStore } from '../store/journalStore';
import { SearchResult } from '../types/journal';

export const useSearch = () => {
  const { entries } = useJournalStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchService = useMemo(() => new SearchService(entries), [entries]);

  useEffect(() => {
    searchService.updateEntries(entries);
  }, [entries, searchService]);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      // Add a small delay to debounce search
      const timeoutId = setTimeout(() => {
        const searchResults = searchService.search(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    };

    performSearch();
  }, [query, searchService]);

  const search = (newQuery: string) => {
    setQuery(newQuery);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  };

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
  };
};