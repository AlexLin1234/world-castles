'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useGlobeStore } from '@/store/useGlobeStore';
import CastleCard from './CastleCard';
import { CATEGORY_COLORS } from '@/lib/constants';

export default function Sidebar() {
  const { selectedCastle, selectCastle } = useGlobeStore();

  return (
    <AnimatePresence>
      {selectedCastle && (
        <motion.aside
          key="sidebar"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          className="absolute top-0 right-0 h-full w-full sm:w-96 z-40 overflow-y-auto"
          style={{
            background: 'rgba(8,8,20,0.96)',
            borderLeft: `1px solid rgba(255,255,255,0.06)`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Accent line at top */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(to right, ${CATEGORY_COLORS[selectedCastle.category]}, transparent)`,
            }}
          />

          {/* Close button */}
          <div className="flex items-center justify-end p-4 pb-0">
            <button
              onClick={() => selectCastle(null)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
              }}
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Card content */}
          <div className="p-5 pt-3">
            <CastleCard castle={selectedCastle} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
