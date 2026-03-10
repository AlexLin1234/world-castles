'use client';

import { Search, X } from 'lucide-react';
import { useGlobeStore } from '@/store/useGlobeStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useGlobeStore();

  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search castles, countries…"
          className="w-full pl-8 pr-8 py-2 text-sm rounded-full outline-none transition-all duration-150 placeholder-slate-500"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: searchQuery
              ? '1px solid rgba(192,160,96,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-75"
          >
            <X size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </button>
        )}
      </div>
    </div>
  );
}
