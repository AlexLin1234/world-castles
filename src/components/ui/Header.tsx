'use client';

import { Castle } from 'lucide-react';
import { useGlobeStore, useTotalCount } from '@/store/useGlobeStore';

export default function Header() {
  const filteredCount = useGlobeStore((s) => s.filteredCastles.length);
  const total = useTotalCount();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between"
      style={{
        background: 'linear-gradient(to bottom, rgba(6,6,16,0.95) 60%, transparent)',
        backdropFilter: 'blur(2px)',
      }}>
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(192,160,96,0.15)', border: '1px solid rgba(192,160,96,0.3)' }}>
          <Castle size={20} style={{ color: '#c0a060' }} />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight tracking-wide">World Castles</h1>
          <p className="text-slate-400 text-xs leading-none">
            {filteredCount < total
              ? `${filteredCount} of ${total} sites`
              : `${total} historic fortifications`}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Interactive Globe</span>
      </div>
    </header>
  );
}
