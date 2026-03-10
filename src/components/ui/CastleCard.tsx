'use client';

import { MapPin, Calendar, Award, Tag, ExternalLink } from 'lucide-react';
import type { Castle } from '@/lib/schema';
import CategoryBadge from './CategoryBadge';
import { CATEGORY_COLORS } from '@/lib/constants';

interface Props {
  castle: Castle;
}

export default function CastleCard({ castle }: Props) {
  const color = CATEGORY_COLORS[castle.category];
  const isUNESCO = castle.heritageStatus.toLowerCase().includes('unesco');

  return (
    <div className="flex flex-col gap-4">
      {/* Castle name & native name */}
      <div>
        <h2 className="text-white text-xl font-bold leading-snug">{castle.name}</h2>
        {castle.nativeName && (
          <p className="text-slate-400 text-sm mt-0.5">{castle.nativeName}</p>
        )}
      </div>

      {/* Category badge */}
      <CategoryBadge category={castle.category} size="md" />

      {/* Meta info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <MapPin size={14} style={{ color }} className="flex-shrink-0" />
          <span>{castle.country}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 text-xs capitalize">{castle.region.replace('-', ' ')}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <Calendar size={14} style={{ color }} className="flex-shrink-0" />
          <span>Built {castle.built}</span>
        </div>

        <div className="flex items-start gap-2 text-slate-300 text-sm">
          <Award
            size={14}
            style={{ color: isUNESCO ? '#f4c430' : color }}
            className="flex-shrink-0 mt-0.5"
          />
          <span className={isUNESCO ? 'text-amber-300' : ''}>{castle.heritageStatus}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />

      {/* Description */}
      <p className="text-slate-300 text-sm leading-relaxed">{castle.description}</p>

      {/* Tags */}
      {castle.tags && castle.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <Tag size={11} className="text-slate-500 mt-0.5 flex-shrink-0" />
          {castle.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs text-slate-400"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Wikipedia link */}
      {castle.wikipedia && (
        <a
          href={`https://en.wikipedia.org/wiki/${castle.wikipedia}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: `${color}cc` }}
          onMouseOver={(e) => (e.currentTarget.style.color = color)}
          onMouseOut={(e) => (e.currentTarget.style.color = `${color}cc`)}
        >
          <ExternalLink size={11} />
          Read on Wikipedia
        </a>
      )}

      {/* Coordinates */}
      <div className="text-xs text-slate-600 font-mono">
        {castle.lat.toFixed(4)}°, {castle.lng.toFixed(4)}°
      </div>
    </div>
  );
}
