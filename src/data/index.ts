import { CastleSchema, type Castle } from '@/lib/schema';

import europeanCastlesRaw from './castles/european-castles.json';
import starFortsRaw from './castles/star-forts.json';
import romanFortsRaw from './castles/roman-forts.json';
import walledCitiesRaw from './castles/walled-cities.json';
import japaneseCastlesRaw from './castles/japanese-castles.json';
import middleEasternCitadelsRaw from './castles/middle-eastern-citadels.json';
import africanFortsRaw from './castles/african-forts.json';
import asianFortsRaw from './castles/asian-forts.json';
import newWorldFortsRaw from './castles/new-world-forts.json';

function validateCastles(raw: unknown[], source: string): Castle[] {
  return raw.map((item, i) => {
    const result = CastleSchema.safeParse(item);
    if (!result.success) {
      console.warn(`Invalid castle data in ${source}[${i}]:`, result.error.flatten());
      return null;
    }
    return result.data;
  }).filter((c): c is Castle => c !== null);
}

export const CASTLES: Castle[] = [
  ...validateCastles(europeanCastlesRaw, 'european-castles'),
  ...validateCastles(starFortsRaw, 'star-forts'),
  ...validateCastles(romanFortsRaw, 'roman-forts'),
  ...validateCastles(walledCitiesRaw, 'walled-cities'),
  ...validateCastles(japaneseCastlesRaw, 'japanese-castles'),
  ...validateCastles(middleEasternCitadelsRaw, 'middle-eastern-citadels'),
  ...validateCastles(africanFortsRaw, 'african-forts'),
  ...validateCastles(asianFortsRaw, 'asian-forts'),
  ...validateCastles(newWorldFortsRaw, 'new-world-forts'),
];

export type { Castle };
