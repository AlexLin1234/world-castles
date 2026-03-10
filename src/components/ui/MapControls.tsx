'use client';

import { Plus, Minus, RotateCcw } from 'lucide-react';
import { useGlobeStore } from '@/store/useGlobeStore';

export default function MapControls() {
  const { selectedCastle, selectCastle } = useGlobeStore();

  const btnStyle = {
    background: 'rgba(8,8,20,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div className="absolute bottom-24 right-3 z-30 flex flex-col gap-1.5">
      {selectedCastle && (
        <button
          onClick={() => selectCastle(null)}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105"
          style={btnStyle}
          title="Reset view"
          aria-label="Reset view"
        >
          <RotateCcw size={14} />
        </button>
      )}
    </div>
  );
}
