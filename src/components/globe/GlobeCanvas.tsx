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

  const {
    filteredCastles,
    selectedCastle,
    selectCastle,
    setHovered,
    setGlobeReady,
  } = useGlobeStore();

  // Initialize globe
  useEffect(() => {
    // `cancelled` is closed over by both the async IIFE below and the cleanup
    // function returned here. This is the only reliable way to stop a
    // still-in-flight async init from racing with the cleanup that React Strict
    // Mode fires synchronously between the two effect invocations.
    let cancelled = false;
    let destroyGlobe: (() => void) | undefined;

    (async () => {
      if (!containerRef.current || globeRef.current) return;

      // globe.gl types declare it as a class constructor, but runtime usage
      // requires new GlobeGL(element) — use any to bypass TypeScript's class check.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GlobeConstructor: any = (await import('globe.gl')).default;

      // Re-check after await. `cancelled` being true means the cleanup already
      // ran (React Strict Mode unmounted before the import resolved) — bail out
      // entirely so we never call new GlobeConstructor and allocate a WebGL context.
      if (cancelled || !containerRef.current || globeRef.current) return;

      const globe: GlobeInstance = new GlobeConstructor(containerRef.current);

      globe
        .globeImageUrl('/textures/earth-night.jpg')
        .atmosphereColor('#1a6b9a')
        .atmosphereAltitude(0.2)
        .width(containerRef.current.clientWidth)
        .height(containerRef.current.clientHeight)
        .pointsData([])
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

      const handleResize = () => {
        if (containerRef.current && globeRef.current) {
          globeRef.current
            .width(containerRef.current.clientWidth)
            .height(containerRef.current.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      destroyGlobe = () => {
        window.removeEventListener('resize', handleResize);
        if (globeRef.current) {
          globeRef.current._destructor?.();
          globeRef.current = null;
        }
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    })();

    return () => {
      cancelled = true;
      destroyGlobe?.();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update points data when filters change
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointsData(filteredCastles);
  }, [filteredCastles]);

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
