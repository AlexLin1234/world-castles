'use client';

import { create } from 'zustand';
import { CASTLES } from '@/data';
import { ALL_CATEGORIES, ALL_REGIONS } from '@/lib/constants';
import type { Castle, CastleCategory, CastleRegion } from '@/lib/schema';

interface GlobeStore {
  selectedCastle: Castle | null;
  hoveredCastle: Castle | null;
  activeCategories: Set<CastleCategory>;
  activeRegions: Set<CastleRegion>;
  searchQuery: string;
  isGlobeReady: boolean;

  selectCastle: (castle: Castle | null) => void;
  setHovered: (castle: Castle | null) => void;
  toggleCategory: (cat: CastleCategory) => void;
  toggleRegion: (region: CastleRegion) => void;
  setSearchQuery: (q: string) => void;
  setGlobeReady: () => void;
  clearFilters: () => void;

  filteredCastles: Castle[];
}

function computeFiltered(
  activeCategories: Set<CastleCategory>,
  activeRegions: Set<CastleRegion>,
  searchQuery: string,
): Castle[] {
  return CASTLES.filter((castle) => {
    if (activeCategories.size > 0 && !activeCategories.has(castle.category)) return false;
    if (activeRegions.size > 0 && !activeRegions.has(castle.region)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        castle.name.toLowerCase().includes(q) ||
        castle.country.toLowerCase().includes(q) ||
        (castle.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });
}

export const useGlobeStore = create<GlobeStore>((set, get) => ({
  selectedCastle: null,
  hoveredCastle: null,
  activeCategories: new Set<CastleCategory>(),
  activeRegions: new Set<CastleRegion>(),
  searchQuery: '',
  isGlobeReady: false,
  filteredCastles: CASTLES,

  selectCastle: (castle) => set({ selectedCastle: castle }),

  setHovered: (castle) => set({ hoveredCastle: castle }),

  toggleCategory: (cat) => {
    const next = new Set(get().activeCategories);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    set({
      activeCategories: next,
      filteredCastles: computeFiltered(next, get().activeRegions, get().searchQuery),
    });
  },

  toggleRegion: (region) => {
    const next = new Set(get().activeRegions);
    if (next.has(region)) {
      next.delete(region);
    } else {
      next.add(region);
    }
    set({
      activeRegions: next,
      filteredCastles: computeFiltered(get().activeCategories, next, get().searchQuery),
    });
  },

  setSearchQuery: (q) => {
    set({
      searchQuery: q,
      filteredCastles: computeFiltered(get().activeCategories, get().activeRegions, q),
    });
  },

  setGlobeReady: () => set({ isGlobeReady: true }),

  clearFilters: () =>
    set({
      activeCategories: new Set<CastleCategory>(),
      activeRegions: new Set<CastleRegion>(),
      searchQuery: '',
      filteredCastles: CASTLES,
    }),
}));

export const useTotalCount = () => CASTLES.length;
export const useFilteredCount = () => useGlobeStore((s) => s.filteredCastles.length);
export const ALL_CATEGORY_LIST = ALL_CATEGORIES;
export const ALL_REGION_LIST = ALL_REGIONS;
