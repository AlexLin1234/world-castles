import { z } from 'zod';

export const CastleSchema = z.object({
  id: z.string(),
  name: z.string(),
  nativeName: z.string().optional(),
  category: z.enum([
    'european-castle',
    'star-fort',
    'roman-fort',
    'walled-city',
    'japanese-castle',
    'middle-eastern-citadel',
    'african-fort',
    'asian-fort',
    'crusader-castle',
    'new-world-fort',
  ]),
  region: z.enum([
    'europe',
    'middle-east',
    'east-asia',
    'south-asia',
    'africa',
    'americas',
    'oceania',
  ]),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
  built: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  heritageStatus: z.string(),
  imageUrl: z.string().optional(),
  wikipedia: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type Castle = z.infer<typeof CastleSchema>;
export type CastleCategory = Castle['category'];
export type CastleRegion = Castle['region'];
