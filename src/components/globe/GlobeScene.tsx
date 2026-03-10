'use client';

import dynamic from 'next/dynamic';
import { useGlobeStore } from '@/store/useGlobeStore';
import LoadingScreen from '@/components/ui/LoadingScreen';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function GlobeScene() {
  const isReady = useGlobeStore((s) => s.isGlobeReady);
  const webglError = useGlobeStore((s) => s.webglError);

  if (webglError) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
        style={{ background: '#060610' }}
      >
        <h2 className="text-white text-lg font-semibold">
          WebGL is not available
        </h2>
        <p className="text-slate-400 text-sm max-w-md">
          The 3D globe requires WebGL support. Please try a different browser or
          enable hardware acceleration in your browser settings.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {!isReady && <LoadingScreen />}
      <GlobeCanvas />
    </div>
  );
}
