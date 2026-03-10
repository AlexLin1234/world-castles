'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useGlobeStore } from '@/store/useGlobeStore';
import { CATEGORY_COLORS } from '@/lib/constants';
import type { Castle } from '@/lib/schema';

// globe.gl is only available in browser environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any;

export default function GlobeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance>(null);
  const [globeInitialized, setGlobeInitialized] = useState(false);

  const {
    filteredCastles,
    selectedCastle,
    selectCastle,
    setHovered,
    setGlobeReady,
    setWebGLError,
  } = useGlobeStore();

  const initGlobe = useCallback(async () => {
    if (!containerRef.current || globeRef.current) return;

    // globe.gl types declare it as a class constructor, but runtime usage
    // requires new GlobeGL(element) — use any to bypass TypeScript's class check.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const GlobeConstructor: any = (await import('globe.gl')).default;

    // Re-check after await: the component may have unmounted while the dynamic
    // import was in flight (React Strict Mode tears down and remounts effects).
    if (!containerRef.current || globeRef.current) return;

    let globe: GlobeInstance;
    try {
      // Pass waitForGlobeReady: false so the scene is visible immediately
      // rather than waiting for the globe texture to load (which can fail
      // silently and leave the screen blank).
      globe = new GlobeConstructor(containerRef.current, {
        waitForGlobeReady: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('WebGL context could not be created:', message);
      setWebGLError(message);
      return;
    }

    // Load initial castle data from the store so points are visible
    // immediately — the filteredCastles effect alone misses the first
    // render because the globe ref isn't set yet when it runs.
    const initialCastles = useGlobeStore.getState().filteredCastles;

    globe
      .globeImageUrl('/textures/earth-night.jpg')
      .atmosphereColor('#1a6b9a')
      .atmosphereAltitude(0.2)
      .width(containerRef.current.clientWidth)
      .height(containerRef.current.clientHeight)
      .pointsData(initialCastles)
      .pointLat((d: Castle) => d.lat)
      .pointLng((d: Castle) => d.lng)
      .pointColor((d: Castle) => CATEGORY_COLORS[d.category] ?? '#ffffff')
      .pointRadius(0.45)
      .pointAltitude(0.008)
      .pointLabel((d: Castle) => `
        <div style="
          background: rgba(10,10,20,0.92);
          border: 1px solid ${CATEGORY_COLORS[d.category] ?? '#888'};
          border-radius: 8px;
          padding: 8px 12px;
          color: #fff;
          font-family: system-ui, sans-serif;
          font-size: 13px;
          max-width: 220px;
          line-height: 1.4;
          backdrop-filter: blur(4px);
        ">
          <div style="font-weight:600; margin-bottom:4px; color: ${CATEGORY_COLORS[d.category] ?? '#fff'}">${d.name}</div>
          <div style="opacity:0.7; font-size:11px;">${d.country} · ${d.built}</div>
          <div style="margin-top:6px; font-size:12px; opacity:0.85;">${d.shortDescription}</div>
        </div>
      `)
      .onPointClick((point: Castle) => {
        selectCastle(point);
        globe.controls().autoRotate = false;
        globe.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.2 }, 800);
      })
      .onPointHover((point: Castle | null) => {
        setHovered(point);
        if (containerRef.current) {
          containerRef.current.style.cursor = point ? 'pointer' : 'grab';
        }
      });

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.4;
    globe.controls().enableDamping = true;

    // Set initial view
    globe.pointOfView({ lat: 35, lng: 15, altitude: 2.0 });

    globeRef.current = globe;
    setGlobeReady();
    setGlobeInitialized(true);

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && globeRef.current) {
        globeRef.current
          .width(containerRef.current.clientWidth)
          .height(containerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Destroy the WebGL context so it can be recreated cleanly (e.g. HMR, Strict Mode)
      if (globeRef.current) {
        globeRef.current._destructor?.();
        globeRef.current = null;
      }
      // Remove any leftover canvas elements the library appended
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize globe
  useEffect(() => {
    // Track whether React has already torn this effect down (Strict Mode or
    // fast-refresh). If teardown fires before the async import resolves we
    // call the globe's cleanup immediately inside the .then(); otherwise we
    // store it so the synchronous return callback can call it.
    let cleanupFn: (() => void) | undefined;
    let cancelled = false;

    initGlobe().then((fn) => {
      if (cancelled) {
        fn?.(); // torn down while import was in flight — clean up right now
      } else {
        cleanupFn = fn;
      }
    });

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, [initGlobe]);

  // Update points data when filters change or when the globe finishes initializing
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointsData(filteredCastles);
  }, [filteredCastles, globeInitialized]);

  // Fly to selected castle
  useEffect(() => {
    if (!globeRef.current || !selectedCastle) return;
    globeRef.current.pointOfView(
      { lat: selectedCastle.lat, lng: selectedCastle.lng, altitude: 1.2 },
      600
    );
  }, [selectedCastle]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: '#060610' }}
    />
  );
}
