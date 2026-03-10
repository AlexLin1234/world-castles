'use client';

import { X } from 'lucide-react';
import { useGlobeStore, ALL_CATEGORY_LIST, ALL_REGION_LIST } from '@/store/useGlobeStore';
import { CATEGORY_COLORS, CATEGORY_LABELS, REGION_LABELS } from '@/lib/constants';
import type { CastleCategory, CastleRegion } from '@/lib/schema';

export default function FilterBar() {
  const { activeCategories, activeRegions, toggleCategory, toggleRegion, clearFilters } = useGlobeStore();
  const hasFilters = activeCategories.size > 0 || activeRegions.size > 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 pb-4 px-3"
      style={{
        background: 'linear-gradient(to top, rgba(6,6,16,0.95) 50%, transparent)',
      }}>

      {/* Category pills */}
      <div className="flex gap-1.5 flex-wrap justify-center mb-2 max-w-5xl mx-auto">
        {ALL_CATEGORY_LIST.map((cat: CastleCategory) => {
          const active = activeCategories.has(cat);
          const color = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150"
              style={{
                background: active ? `${color}30` : 'rgba(255,255,255,0.05)',
                border: active ? `1px solid ${color}80` : '1px solid rgba(255,255,255,0.1)',
                color: active ? color : 'rgba(255,255,255,0.6)',
                boxShadow: active ? `0 0 8px ${color}30` : 'none',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: active ? color : 'rgba(255,255,255,0.3)' }} />
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* Region pills */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {ALL_REGION_LIST.map((region: CastleRegion) => {
          const active = activeRegions.has(region);
          return (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150"
              style={{
                background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                border: active ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
              }}
            >
              {REGION_LABELS[region]}
            </button>
          );
        })}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150"
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: 'rgba(239,68,68,0.9)',
            }}
          >
            <X size={10} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
