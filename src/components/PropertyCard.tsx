import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bed, Bath, SquareIcon, Tag, X } from 'lucide-react';
import type { Property } from '../types';

export type { Property };

// ── 3D Tilt Wrapper — mouse-tracked rotateX/Y ─────────────────────────────
function TiltWrapper({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-70, 70], [9, -9]);
  const rotateY = useTransform(x, [-70, 70], [-9, 9]);

  const springRotX = useSpring(rotateX, { stiffness: 280, damping: 28, mass: 0.5 });
  const springRotY = useSpring(rotateY, { stiffness: 280, damping: 28, mass: 0.5 });
  const shimmerX = useTransform(x, [-70, 70], [-15, 15]);
  const shimmerY = useTransform(y, [-70, 70], [-15, 15]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
      }}
    >
      {/* Dynamic highlight shimmer on tilt */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          background: 'radial-gradient(circle at 50% 50%, rgba(233,196,0,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 2,
          x: shimmerX,
          y: shimmerY,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function PropertyCard({ p }: { p: Property }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={p.image}
              alt={p.title}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TiltWrapper>
        <article className="property-card rounded-2xl overflow-hidden group border border-white/[0.06] md:border-transparent bg-white/[0.01] md:bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.02)] md:shadow-none transition-colors">
          {/* Image */}
          <div
            className="relative h-60 overflow-hidden cursor-pointer"
            onClick={() => setIsFullscreen(true)}
            role="button"
            tabIndex={0}
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />

            {/* Type badge */}
            <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 z-10">
              <span className="text-[10px] font-label font-600 uppercase tracking-wider text-white/80">
                {p.type}
              </span>
            </div>

            {/* Quick Glance Overlay (Slide up on hover) */}
            <div className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3 translate-y-8 group-hover:translate-y-0 z-20">
              <button
                onClick={(e) => { e.preventDefault(); setIsFullscreen(true); }}
                className="w-[80%] bg-white/10 hover:bg-gold-500 hover:text-black text-white border border-white/20 hover:border-gold-500 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                Quick View
              </button>
              <Link
                to="/"
                className="w-[80%] text-center bg-white/5 hover:bg-white/20 text-white/80 border border-white/10 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                Video Tour
              </Link>
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <h3 className="font-display font-600 text-white text-lg leading-tight group-hover:text-gold-400 transition-colors truncate">
              {p.title}
            </h3>

            <Link
              to={`/properties/${p.id}`}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gold-500/30 text-gold-400 text-xs font-label font-600 uppercase tracking-widest hover:bg-gold-500/10 hover:border-gold-500/60 transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        </article>
      </TiltWrapper>
    </>
  );
}
