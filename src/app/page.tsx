import GlobeScene from '@/components/globe/GlobeScene';
import Header from '@/components/ui/Header';
import FilterBar from '@/components/ui/FilterBar';
import Sidebar from '@/components/ui/Sidebar';
import SearchBar from '@/components/ui/SearchBar';
import MapControls from '@/components/ui/MapControls';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden" style={{ background: '#060610' }}>
      {/* Globe fills the entire screen */}
      <GlobeScene />

      {/* UI overlays */}
      <Header />
      <SearchBar />
      <FilterBar />
      <Sidebar />
      <MapControls />
    </main>
  );
}
