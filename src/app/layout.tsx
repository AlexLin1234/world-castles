import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'World Castles — Interactive Globe',
  description:
    'Explore over 100 historic castles, fortifications, star forts, and walled cities on an interactive 3D globe. From Himeji to Krak des Chevaliers, from the Great Wall to Fort Jefferson.',
  keywords: [
    'castles', 'interactive globe', 'fortifications', 'star forts', 'walled cities',
    'UNESCO', 'medieval', 'history', 'architecture',
  ],
  openGraph: {
    title: 'World Castles — Interactive Globe',
    description: 'Explore 100+ historic fortifications worldwide on an interactive 3D globe.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased"
        style={{
          background: '#060610',
          color: '#fff',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
