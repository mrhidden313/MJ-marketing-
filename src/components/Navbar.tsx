import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'Projects',   to: '/projects' },
  { label: 'About',      to: '/about' },
  { label: 'Contact',    to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location = useLocation();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── Use IntersectionObserver instead of scroll listener
  // This fires ZERO times while scrolling — only fires at 80px threshold
  // Eliminates 100s of React re-renders per second → 120fps
  useEffect(() => {
    // Reset scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const sentinel = document.createElement('div');
    // Must be absolute so it scrolls with the page and triggers the observer
    sentinel.style.cssText = 'position:absolute;top:80px;left:0;width:1px;height:1px;pointer-events:none;z-index:-1;';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className={`pointer-events-auto transition-all duration-700 ease-in-out ${
        scrolled || open ? 'py-0 md:py-0' : 'py-3 md:py-6'
      }`}>
        <div className={`mx-auto border transition-all duration-700 ease-in-out ${
          scrolled || open
            ? 'max-w-[800px] px-2 py-1.5 mt-2 rounded-[2rem] liquid-glass bg-[#02040a]/95 shadow-2xl'
            : 'max-w-7xl px-4 lg:px-8 rounded-2xl bg-transparent border-transparent mt-0'
        }`}>
          <div className={`flex items-center justify-between h-14 md:h-16 transition-all duration-700 ease-in-out ${
            scrolled || open ? 'px-2' : 'px-4 md:px-12 lg:px-24'
          }`}>

          {/* ── Logo — shrink & shift on scroll ── */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', bounce: 0.65, duration: 1.5, delay: 0.1 }}
            >
              <motion.div
                className="rounded-full overflow-hidden border border-gold-500/40 bg-white flex items-center justify-center transition-all duration-700 ease-in-out"
              style={{
                width: scrolled ? '36px' : '48px',
                height: scrolled ? '36px' : '48px',
              }}
              whileHover={{
                scale: 1.15,
                rotate: 10,
                boxShadow: '0 0 24px rgba(233,196,0,0.6)',
                transition: { type: 'spring', stiffness: 500, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/logo.png"
                alt="MJ GROUP OF COMPANIES"
                className="object-contain transition-all duration-700 ease-in-out"
                style={{
                  width: scrolled ? '24px' : '34px',
                  height: scrolled ? '24px' : '34px',
                }}
              />
              </motion.div>
            </motion.div>
          </Link>

          {/* ── Mobile Center Text (Only shows when scrolled and menu is closed) ── */}
          <AnimatePresence>
            {scrolled && !open && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="md:hidden flex-1 flex justify-center pointer-events-none"
              >
                <span className="text-gold-400 font-display font-bold text-lg tracking-widest uppercase" style={{ textShadow: '0 0 15px rgba(233,196,0,0.3)' }}>
                  MJ GROUP OF COMPANIES
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Desktop Nav — center pill ── */}
          <motion.nav 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.65, duration: 1.5, delay: 0.2 }}
            className="hidden md:flex items-center"
          >
            <div className={`flex items-center gap-1 transition-all duration-700 ${scrolled ? 'bg-transparent px-2 py-1.5 rounded-full' : 'glass px-3 py-2 rounded-full'}`}>
              {NAV_LINKS.map(({ label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-full font-label font-600 uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${
                      scrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-2.5 text-[14px]'
                    } ${
                      isActive
                        ? 'bg-gold-500 text-black shadow-gold-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {/* Spring underline hover effect on inactive links */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-1/2 w-full h-[1px] bg-gold-500/60 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    )}
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>

          {/* ── CTA with dynamic slide on scroll ── */}
          <motion.a
            href="tel:+923005522555"
            className={`hidden md:inline-flex btn-gold btn-call-ring gap-1.5 transition-all duration-700 ease-in-out ${
              scrolled ? 'py-1.5 px-4 text-xs scale-95 shadow-lg shadow-gold-500/20' : 'py-3 px-8 text-sm scale-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', bounce: 0.65, duration: 1.5, delay: 0.3 }}
          >
            <Phone size={scrolled ? 12 : 14} /> Call Now
          </motion.a>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-gold-500 transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-gold-500 transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-gold-500 transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-1.5 px-4 pt-4 mt-2 border-t border-white/10">
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-label font-600 uppercase tracking-wider transition-all text-center ${
                    isActive ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20' : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <a href="tel:+923005522555" className="btn-gold btn-call-ring mt-3 py-3 text-sm flex justify-center">
              <Phone size={14} className="mr-2" /> Call Now
            </a>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
