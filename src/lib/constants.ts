import type { CastleCategory, CastleRegion } from './schema';

export const CATEGORY_COLORS: Record<CastleCategory, string> = {
  'european-castle': '#c0a060',
  'star-fort': '#60a0c0',
  'roman-fort': '#c06060',
  'walled-city': '#80c080',
  'japanese-castle': '#e08060',
  'middle-eastern-citadel': '#a060c0',
  'crusader-castle': '#c08040',
  'african-fort': '#60c0a0',
  'asian-fort': '#e0c060',
  'new-world-fort': '#4080c0',
};

export const CATEGORY_LABELS: Record<CastleCategory, string> = {
  'european-castle': 'European Castles',
  'star-fort': 'Star Forts',
  'roman-fort': 'Roman Forts',
  'walled-city': 'Walled Cities',
  'japanese-castle': 'Japanese Castles',
  'middle-eastern-citadel': 'Middle Eastern Citadels',
  'crusader-castle': 'Crusader Castles',
  'african-fort': 'African Fortifications',
  'asian-fort': 'Asian Forts',
  'new-world-fort': 'New World Forts',
};

export const REGION_LABELS: Record<CastleRegion, string> = {
  'europe': 'Europe',
  'middle-east': 'Middle East',
  'east-asia': 'East Asia',
  'south-asia': 'South Asia',
  'africa': 'Africa',
  'americas': 'Americas',
  'oceania': 'Oceania',
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS) as CastleCategory[];
export const ALL_REGIONS = Object.keys(REGION_LABELS) as CastleRegion[];
