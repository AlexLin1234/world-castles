'use client';

import { useEffect, useRef } from 'react';
import { useGlobeStore } from '@/store/useGlobeStore';
import { CATEGORY_COLORS } from '@/lib/constants';
import type { Castle } from '@/lib/schema';

// globe.gl is only available in browser environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any;

export default function GlobeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance>(null);

  // Initialize globe
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let globe: GlobeInstance | null = null;
    let cancelled = false;

    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GlobeGL: any = (await import('globe.gl')).default;

      // Bail if component unmounted while the import was in flight
      if (cancelled) return;

      // Use the documented factory pattern: Globe(options)(domElement)
      // Pass waitForGlobeReady: false so the Three.js scene is visible
      // immediately rather than staying invisible until the globe texture
      // loads (which can fail silently and leave the screen permanently blank).
      try {
        globe = GlobeGL({ waitForGlobeReady: false })(container);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn('WebGL context could not be created:', message);
        useGlobeStore.getState().setWebGLError(message);
        return;
      }

      if (cancelled) {
        globe._destructor?.();
        globe = null;
        return;
      }

      // Use container dimensions, falling back to window dimensions if the
      // container hasn't been laid out yet (0×0).
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      const initialCastles = useGlobeStore.getState().filteredCastles;

      globe
        .backgroundColor('#060610')
        .globeImageUrl('/textures/earth-night.jpg')
        .atmosphereColor('#1a6b9a')
        .atmosphereAltitude(0.2)
        .showAtmosphere(true)
        .showGlobe(true)
        .width(w)
        .height(h)
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
          useGlobeStore.getState().selectCastle(point);
          globe.controls().autoRotate = false;
          globe.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.2 }, 800);
        })
        .onPointHover((point: Castle | null) => {
          useGlobeStore.getState().setHovered(point);
          if (container) {
            container.style.cursor = point ? 'pointer' : 'grab';
          }
        });

      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.4;
      globe.controls().enableDamping = true;

      // Set initial view
      globe.pointOfView({ lat: 35, lng: 15, altitude: 2.0 });

      globeRef.current = globe;
      useGlobeStore.getState().setGlobeReady();
    })();

    // Handle resize
    const handleResize = () => {
      if (globeRef.current && container) {
        const rw = container.clientWidth || window.innerWidth;
        const rh = container.clientHeight || window.innerHeight;
        globeRef.current.width(rw).height(rh);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      if (globeRef.current) {
        globeRef.current._destructor?.();
        globeRef.current = null;
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Update points data when filters change
  const filteredCastles = useGlobeStore((s) => s.filteredCastles);
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointsData(filteredCastles);
  }, [filteredCastles]);

  // Fly to selected castle
  const selectedCastle = useGlobeStore((s) => s.selectedCastle);
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
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#060610',
      }}
    />
  );
}
