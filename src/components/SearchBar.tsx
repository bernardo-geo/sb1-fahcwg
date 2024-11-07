import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleReset: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, handleReset }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === '') {
      handleReset();
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-3 sm:p-4 border-b border-gray-100">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search points of interest..."
          className="w-full h-9 px-4 pl-9 pr-9 bg-gray-50 border border-gray-200 
            rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
        <Search 
          className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={16} 
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              handleReset();
            }}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 
              hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="w-full h-9 mt-2 bg-blue-600 text-white rounded-lg text-sm font-medium
          hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
      >
        Search
      </button>
    </form>
  );
}