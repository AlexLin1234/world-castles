'use client';

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#060610' }}>
      <div className="relative mb-6">
        {/* Animated globe SVG */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="animate-spin" style={{ animationDuration: '3s' }}>
          <circle cx="40" cy="40" r="34" stroke="#1a6b9a" strokeWidth="2" fill="none" />
          <ellipse cx="40" cy="40" rx="16" ry="34" stroke="#1a6b9a" strokeWidth="1.5" fill="none" />
          <line x1="6" y1="40" x2="74" y2="40" stroke="#1a6b9a" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="3" fill="#c0a060" />
        </svg>
        <div className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 40px 10px rgba(26,107,154,0.3)' }} />
      </div>
      <h2 className="text-white font-semibold text-lg tracking-wide mb-2">World Castles</h2>
      <p className="text-slate-400 text-sm">Loading the globe…</p>
    </div>
  );
}
