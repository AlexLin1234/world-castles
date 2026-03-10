import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
    ],
  },
  // Ensure globe.gl Three.js dependencies are transpiled
  transpilePackages: ['three'],
};

export default nextConfig;
