import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, Map as MapIcon, SlidersHorizontal, ChevronRight, ChevronLeft } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';

type FilterState = { location: string; type: string; status: string; };

const TYPES = ['All', 'House', 'Apartment', 'Plot'];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SkeletonCard = () => (
  <div className="rounded-[2rem] overflow-hidden liquid-glass border border-white/5 h-[450px] animate-pulse flex flex-col">
    <div className="w-full h-[240px] bg-white/5" />
    <div className="p-6 flex flex-col flex-1">
      <div className="w-24 h-6 bg-gold-500/20 rounded-full mb-4" />
      <div className="w-3/4 h-8 bg-white/10 rounded-md mb-3" />
      <div className="w-1/2 h-4 bg-white/5 rounded-md mb-6" />
      
      <div className="flex gap-4 mb-auto">
        <div className="w-16 h-5 bg-white/5 rounded-md" />
        <div className="w-16 h-5 bg-white/5 rounded-md" />
        <div className="w-16 h-5 bg-white/5 rounded-md" />
      </div>
      <div className="w-1/3 h-8 bg-white/10 rounded-md mt-6" />
    </div>
  </div>
);

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState('');
  const { properties, loading } = useProperties();

  const filtered = properties.filter(p => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(query) || 
           p.location.toLowerCase().includes(query) || 
           p.type.toLowerCase().includes(query);
  });

  const featuredProperties = properties.slice(0, 4); // Top 4 for carousel

  return (
    <div className="bg-[#02040a] min-h-screen">
      {/* ═══════════════════════════════ CINEMATIC HEADER ════════════════════════════ */}
      <section className="relative pt-40 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Abstract Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02040a] opacity-80 z-10" />
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold-500/10 blur-[150px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Exclusive Portfolio
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-900 text-5xl md:text-7xl text-white mb-6 tracking-tight leading-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700">Luxury</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Explore Peshawar's most prestigious real estate. Hand-picked properties curated for the elite.
            </p>
          </FadeUp>
        </div>
      </section>



      {/* ═══════════════════════════════ PREMIUM SEARCH BAR ════════════════════════════ */}
      <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-16 relative z-40 -mt-10">
        <div className="liquid-glass rounded-full p-2 pl-6 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <Search size={22} className="text-gold-500 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by property name, location, or type..." 
            className="w-full bg-transparent border-none text-white focus:outline-none placeholder-white/40 font-light text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-gold-gradient text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(233,196,0,0.3)] shrink-0 transition-transform hover:scale-105 active:scale-95">
            Search
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════ PROPERTY GRID (FLIP) ════════════════════════════ */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {/* Render the properties that have arrived so far */}
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard p={p} />
              </motion.div>
            ))}

            {/* Render skeletons for the remaining slots if still loading */}
            {loading && [...Array(Math.max(0, 8 - filtered.length))].map((_, i) => (
              <motion.div
                key={`skeleton-${i + filtered.length}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-32 liquid-glass rounded-3xl mt-10 border border-white/5">
            <Search size={40} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40 text-xl font-display font-light">No properties match your exact search.</p>
            <button className="mt-6 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-bold tracking-wider uppercase transition-colors" onClick={() => setSearchQuery('')}>
              Clear Search
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
