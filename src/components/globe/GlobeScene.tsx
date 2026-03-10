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

  return (
    <div className="absolute inset-0">
      {!isReady && <LoadingScreen />}
      <GlobeCanvas />
    </div>
  );
}
