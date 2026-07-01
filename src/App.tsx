import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import SmoothScroller from './components/SmoothScroller';
import { ScrollProgress } from './components/ui/scroll-progress';
import { SoundEffects } from './components/ui/sound-effects';

// ── Scroll to top on every route change ──────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// ── Advanced Custom Cursor (desktop/pointer devices only) ─────────────────
function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Inner dot: very fast spring
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 55, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 55, mass: 0.3 });
  // Outer ring: slow trailing spring
  const ringX = useSpring(mouseX, { stiffness: 110, damping: 22, mass: 0.9 });
  const ringY = useSpring(mouseY, { stiffness: 110, damping: 22, mass: 0.9 });
  // Glow blob: ultra slow trailing
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 18, mass: 1.5 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 18, mass: 1.5 });

  useEffect(() => {
    // Only activate on true pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element;
      const cur = el ? window.getComputedStyle(el).cursor : '';
      setHovering(cur === 'pointer' || cur === 'grab' || cur === 'text');
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', move);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Ultra slow ambient glow blob */}
      <motion.div
        style={{
          position: 'fixed',
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,196,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9995,
          filter: 'blur(12px)',
        }}
      />
      {/* Slow trailing outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid rgba(233,196,0,0.5)',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: hovering ? 1 : 0.6,
          borderColor: hovering ? 'rgba(233,196,0,0.95)' : 'rgba(233,196,0,0.5)',
          boxShadow: hovering ? '0 0 16px rgba(233,196,0,0.3)' : '0 0 6px rgba(233,196,0,0.1)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Fast inner gold dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: '#e9c400',
          boxShadow: '0 0 10px rgba(233,196,0,0.9), 0 0 25px rgba(233,196,0,0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          width: hovering ? 0 : 7,
          height: hovering ? 0 : 7,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Hover state: crosshair ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '2px solid rgba(233,196,0,0.9)',
          background: 'rgba(233,196,0,0.08)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          width: hovering ? 20 : 0,
          height: hovering ? 20 : 0,
          opacity: hovering ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}


// ── Page transition wrapper ───────────────────────────────────────────────
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/properties" element={<PageWrapper><Properties /></PageWrapper>} />
        <Route path="/about"      element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact"    element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/projects"   element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/privacy"    element={<PageWrapper><Privacy /></PageWrapper>} />
        <Route path="/terms"      element={<PageWrapper><Terms /></PageWrapper>} />
        <Route path="/login"      element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/admin"      element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

// ── Improved WhatsApp FAB with animated pulse rings ───────────────────────
function WhatsAppFAB() {
  return (
    <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50" style={{ width: '56px', height: '56px' }}>
      {/* Pulse ring 1 */}
      <motion.span
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(37,211,102,0.4)' }}
        animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Pulse ring 2 (delayed) */}
      <motion.span
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(37,211,102,0.3)' }}
        animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
      />
      <motion.a
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.14, boxShadow: '0 0 30px rgba(37,211,102,0.65)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'white' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Global Background Layer */}
        <div className="global-bg-mesh" />
        
        <div className="min-h-screen flex flex-col relative z-0 overflow-x-hidden">
          <ScrollToTop />
          <ScrollProgress />
          <SoundEffects />
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
