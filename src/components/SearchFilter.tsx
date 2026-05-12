import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

interface SearchFilterProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onReset?: () => void;
  showReset?: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = 'Buscar...',
  onSearch,
  onReset,
  showReset = true
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleReset = () => {
    setQuery('');
    onReset?.();
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="input pl-10"
        />
      </div>
      {showReset && query && (
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gris-200 text-gris-800 rounded-lg hover:bg-gris-300 transition-colors flex items-center gap-2"
        >
          <X size={18} />
          Limpiar
        </button>
      )}
    </div>
  );
};
