import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, MapPin, TrendingUp, Shield, Star, Play, X, Handshake, Clock, Award, FileCheck } from 'lucide-react';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { CoreServicesGrid } from '../components/ui/core-services';
import { BlueprintHours } from '../components/ui/blueprint-hours';
import { useProperties } from '../hooks/useProperties';

// ── Framer Motion variants for stagger cascade ────────────────────────────
const heroContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const heroItemVariants = {
  hidden: { opacity: 0, y: 35 },
  show:   { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
};

// Slide-in from sides for section headers (faster)
const slideLeftVariant  = { hidden: { opacity: 0, x: -90 }, show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.55 } } };
const slideRightVariant = { hidden: { opacity: 0, x:  90 }, show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.55 } } };

// Flip card for services (punchier spring)
const flipContainerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};
const flipCardVariant = {
  hidden: { opacity: 0, rotateY: -25, scale: 0.9, y: 20 },
  show:   { opacity: 1, rotateY: 0,   scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 } },
};

// Zoom-blur for testimonial
const zoomBlurVariant = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(12px)', y: 30 },
  show:   { opacity: 1, scale: 1,    filter: 'blur(0px)', y: 0,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 } },
};

// ── FadeSlideUp — added pronounced slide effect ────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SplitHeading — word-by-word 3D tile reveal ────────────────────────────
function SplitHeading({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const words = (children as string).split(' ');
  return (
    <motion.span
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="split-word"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: 60, scale: 0.9 },
            show:   { opacity: 1, y: 0,  rotateX: 0, scale: 1,
              transition: { type: 'spring', stiffness: 150, damping: 15 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Floating particle dot with mouse parallax ─────────────────────────────
function Dot({ style, mouseX, mouseY, factor = 1 }: {
  style?: React.CSSProperties;
  mouseX: number; mouseY: number; factor?: number;
}) {
  return (
    <motion.span
      className="absolute w-1.5 h-1.5 rounded-full bg-gold-500/40 animate-float"
      style={style}
      animate={{
        x: mouseX * factor,
        y: mouseY * factor,
      }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.5 }}
    />
  );
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 250, damping: 35, mass: 0.3 });
  return (
    <motion.div
      id="scroll-progress"
      style={{ scaleX }}
    />
  );
}

// ── AnimatedCounter ───────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
    restDelta: 1,
  });

  useEffect(() => {
    if (inView) spring.set(end);
  }, [inView, spring, end]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
  { end: 500, suffix: '+', label: 'Properties Sold' },
  { end: 1000, suffix: '+', label: 'Happy Clients' },
  { end: 10,  suffix: '+', label: 'Years Experience' },
  { end: 98,  suffix: '%', label: 'Client Satisfaction' },
];

const ADVANTAGES = [
  { icon: MapPin,     title: 'Prime Locations',  desc: 'Access to Peshawar’s most prestigious and secure communities including DHA & Hayatabad.' },
  { icon: TrendingUp, title: 'High-Yield Returns',   desc: 'Data-driven insights for profitable commercial and residential investments.' },
  { icon: Shield,     title: '100% Secure & Legal',desc: 'FBR and Excise registered agency. Zero risk, fully verified properties only.' },
  { icon: Star,       title: 'VIP Treatment', desc: 'Personalized property hunting and complete hassle-free transfer assistance.' },
  { icon: Handshake,  title: '10+ Years Trust', desc: 'Over 500 successful transactions and 1000+ happy clients since 2015.' },
  { icon: FileCheck,  title: 'Clear Documentation', desc: 'Expert legal verification and transparent property documentation assistance.' },
  { icon: Award,      title: 'Market Leaders', desc: 'Recognized as Peshawar’s #1 trusted real estate agency for luxury living.' },
  { icon: Clock,      title: '24/7 VIP Support', desc: 'Round-the-clock availability for our exclusive investors and clients.' },
];

// Peshawar coverage zones with approximate map coordinates
const PESHAWAR_ZONES = [
  { name: 'Hayatabad',       x: 12, y: 48, count: '120+ Listings', color: '#e9c400' },
  { name: 'Ring Road',       x: 80, y: 68, count: '52+ Listings',  color: '#ffd700' },
  { name: 'Pishtakhara',     x: 65, y: 75, count: '88+ Listings',  color: '#ffd700' },
  { name: 'University Town', x: 26, y: 35, count: '65+ Listings',  color: '#e9c400' },
  { name: 'Peshawar Cantt',  x: 58, y: 42, count: '75+ Listings',  color: '#e9c400' },
  { name: 'Regi Model Town', x: 20, y: 70, count: '45+ Listings',  color: '#c4a000' },
  { name: 'DHA Peshawar',    x: 35, y: 80, count: '90+ Listings',  color: '#e9c400' },
  { name: 'Gulberg',         x: 45, y: 30, count: '30+ Listings',  color: '#e9c400' },
];

// ── Video Modal — lazy loads local video on click ─────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 9980,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ position: 'relative', width: '90vw', maxWidth: '1100px', aspectRatio: '16/9' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          style={{
            position: 'absolute', top: '-50px', right: 0,
            background: 'rgba(233,196,0,0.2)',
            border: '1px solid rgba(233,196,0,0.5)',
            color: '#e9c400',
            borderRadius: '50%',
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.15, background: 'rgba(233,196,0,0.35)', rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <X size={20} />
        </motion.button>
        {/* Local Video Player */}
        <video
          src="/hero-video.mp4"
          autoPlay
          controls
          style={{ width: '100%', height: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)' }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Peshawar Coverage Map ──────────────────────────────────────────────
function PeshawarMap() {
  const [activePin, setActivePin] = useState<number | null>(null);
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(233,196,0,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <FadeUp>
            <span className="section-label justify-center mb-4 block">Our Coverage</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontFamily: 'Inter', fontWeight: 900, color: '#fff' }}>
              Peshawar's <span className="text-gold-gradient">Prime Zones</span>
            </h2>
            <p className="text-white/40 mt-3 text-sm">Hover any pin to explore listings by area</p>
          </FadeUp>
        </div>

        {/* Map container */}
        <div style={{ position: 'relative', maxWidth: '800px', height: '380px', margin: '0 auto' }}>
          {/* Grid background — city map aesthetic */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }} xmlns="http://www.w3.org/2000/svg">
            {/* Vertical grid lines */}
            {[10,20,30,40,50,60,70,80,90].map(x => (
              <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#e9c400" strokeWidth="0.5" />
            ))}
            {/* Horizontal grid lines */}
            {[15,30,45,60,75,90].map(y => (
              <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#e9c400" strokeWidth="0.5" />
            ))}
            {/* Subtle road lines */}
            <path d="M 0 50% Q 30% 45% 50% 50% T 100% 48%" stroke="rgba(233,196,0,0.4)" strokeWidth="1" fill="none" />
            <path d="M 20% 0 L 20% 100%" stroke="rgba(233,196,0,0.3)" strokeWidth="1.5" />
            <path d="M 0 68% L 100% 68%" stroke="rgba(233,196,0,0.25)" strokeWidth="1" />
          </svg>

          {/* Pins — spring stagger drop */}
          {PESHAWAR_ZONES.map(({ name, x, y, count }, i) => (
            <motion.div
              key={name}
              style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: activePin === i ? 10 : 1 }}
              initial={{ y: -60, opacity: 0, scale: 0 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 220, damping: 16 }}
              onHoverStart={() => setActivePin(i)}
              onHoverEnd={() => setActivePin(null)}
            >
              {/* Pin drop indicator */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Glow ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30px', height: '30px',
                    borderRadius: '50%',
                    border: '1px solid rgba(233,196,0,0.5)',
                  }}
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                />
                {/* Pin dot */}
                <motion.div
                  style={{
                    width: '12px', height: '12px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffd700, #e9c400)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 0 10px rgba(233,196,0,0.7)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  whileHover={{ scale: 1.6 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
                {/* Tooltip */}
                <AnimatePresence>
                  {activePin === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.88 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.88 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      style={{
                        position: 'absolute',
                        bottom: '18px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(8,12,35,0.97)',
                        border: '1px solid rgba(233,196,0,0.3)',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        zIndex: 20,
                      }}
                    >
                      <div style={{ color: '#e9c400', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter' }}>{name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', fontFamily: 'Inter', marginTop: '1px' }}>{count}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zone pills below map */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {PESHAWAR_ZONES.map(({ name, count }) => (
            <div
              key={name}
              className="glass-gold rounded-full px-4 py-1.5 flex items-center gap-2"
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e9c400', display: 'inline-block', boxShadow: '0 0 6px #e9c400' }} />
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.7rem', fontFamily: 'Inter', fontWeight: 500 }}>{name}</span>
              <span style={{ color: 'rgba(233,196,0,0.7)', fontSize: '0.62rem', fontFamily: 'Inter' }}>{count}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Typewriter Effect — character stagger with blinking cursor ────────────
function TypewriterText({ lines, startDelay = 0.9 }: { lines: string[]; startDelay?: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.032, delayChildren: startDelay } } }}
      style={{ whiteSpace: 'pre-line' }}
    >
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {line.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={{
                hidden: { opacity: 0 },
                show:   { opacity: 1, transition: { duration: 0 } }
              }}
            >
              {char}
            </motion.span>
          ))}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
      {/* Blinking cursor */}
      <motion.span
        className="inline-block align-middle ml-[2px]"
        style={{ width: '2px', height: '0.85em', background: '#e9c400', verticalAlign: 'middle' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: Infinity, ease: 'steps(1)' }}
      />
    </motion.span>
  );
}

const TRUST_ITEMS = [
  '✦ Established Since 2015',
  '✦ Government Registered',
  '✦ FBR Registered',
  '✦ Licensed Real Estate Agency',
  '✦ Trusted Property Consultants',
  '✦ Peshawar Based',
  '✦ 1000+ Happy Clients',
  '✦ Zero Hidden Fees',
];

// ── Trust Badges Marquee ─────────────────────────────────────────────────
// [REMOVABLE] — to remove: delete this component and <TrustMarquee /> in JSX
function TrustMarquee() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div className="trust-marquee-wrapper" aria-label="Trust badges">
      <div className="trust-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="trust-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ── Wave Divider ─────────────────────────────────────────────────────────
// [REMOVABLE] — to remove: delete this component and <WaveDivider /> in JSX
function WaveDivider() {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z"
          fill="#0c112c"
        />
        <path
          d="M0,55 C240,100 480,10 720,55 C960,100 1200,10 1440,55"
          fill="none"
          stroke="rgba(233,196,0,0.12)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function Home() {
  const { properties, loading } = useProperties();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [videoOpen, setVideoOpen] = useState(false);

  // Set video playback rate to 0.8x
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  // CSS scroll-driven parallax — no JS on scroll path
  // Hero image uses CSS animation-timeline for true off-thread parallax
  // useScroll only used for opacity fade (composited, cheap)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  // Mouse parallax for floating dots — passive listener (zero scroll cost)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 22,
        y: (e.clientY / window.innerHeight - 0.5) * 22,
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const DOT_CONFIGS = [
    { style: { top: '20%', left: '8%',  animationDelay: '0s' },   factor: 0.45 },
    { style: { top: '65%', left: '6%',  animationDelay: '2s' },   factor: 0.3  },
    { style: { top: '35%', left: '92%', animationDelay: '1s' },   factor: 0.6  },
    { style: { top: '72%', left: '88%', animationDelay: '3s' },   factor: 0.35 },
    { style: { top: '15%', left: '78%', animationDelay: '1.5s' }, factor: 0.5  },
  ];

  return (
    <>
      <SEO 
        title="MJ Marketing | Peshawar's #1 Luxury Real Estate Agency" 
        description="Discover Peshawar's most prestigious real estate. MJ Marketing offers exclusive access to luxury homes, VIP projects, and high-yield commercial investments."
      />
      {/* ── Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background — Looping Video Parallax */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-parallax-bg opacity-80"
          src="/hero-video.mp4"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-navy-900/80" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center 40%, rgba(233,196,0,0.1) 0%, transparent 65%)' }} />

        {/* Floating dots with mouse parallax */}
        {DOT_CONFIGS.map((cfg, i) => (
          <Dot key={i} style={cfg.style} mouseX={mouse.x} mouseY={mouse.y} factor={cfg.factor} />
        ))}

        {/* Content — stagger cascade with single parent variants */}
        <motion.div
          style={{ opacity: heroOpacity }}
          variants={heroContainerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-16 flex flex-col items-center text-center"
        >
          {/* Badge chip */}
          <motion.div variants={heroItemVariants}>
            <div className="inline-flex items-center justify-center gap-2 glass-gold rounded-full px-3 py-1.5 md:px-4 md:py-1.5 mb-6 md:mb-8 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse shrink-0" />
              <span className="text-gold-400 text-[10px] sm:text-xs font-label font-600 uppercase tracking-widest text-center">
                Peshawar's #1 Real Estate Agency
              </span>
            </div>
          </motion.div>

          {/* Main heading — ambient glow + pulsing filter */}
          {/* Main heading — Letter-by-Letter Staggered Spring Settle */}
          <motion.h1
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="flex flex-wrap justify-center gap-x-[3vw] gap-y-0 md:gap-y-2 mb-3 md:mb-5"
            style={{
              fontSize: 'clamp(2.8rem, 13vw, 7rem)', // Increased min size by ~15% for mobile
              letterSpacing: '-0.04em',
              fontFamily: 'Inter',
              fontWeight: 900,
              paddingBottom: '0.3em',
              marginBottom: '-0.3em',
              lineHeight: 1.1,
            }}
          >
            {['MJ', 'Marketing'].map((word, i) => (
              <span key={i} className="inline-flex whitespace-nowrap">
                {word.split('').map((letter, j) => (
                  <motion.span
                    key={`${i}-${j}`}
                    variants={{
                      hidden: { opacity: 0, y: 140, filter: 'blur(12px)' },
                      show: { 
                        opacity: 1, 
                        y: [140, -35, 20, -12, 6, -2, 0], 
                        filter: 'blur(0px)', 
                        transition: { 
                          y: { duration: 1.8, times: [0, 0.35, 0.55, 0.7, 0.82, 0.92, 1], ease: "easeInOut" },
                          opacity: { duration: 0.5 },
                          filter: { duration: 0.5 }
                        } 
                      }
                    }}
                    className="inline-block text-transparent bg-clip-text pb-[0.15em]"
                    style={{ backgroundImage: 'linear-gradient(135deg, #e9c400 0%, #ffd700 50%, #c4a000 100%)' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Sub heading — typewriter effect */}
          <motion.div variants={heroItemVariants}>
            <p
              className="text-white/65 leading-tight mb-10"
              style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.65rem)',
                letterSpacing: '-0.01em',
                fontFamily: 'Inter',
                fontWeight: 600,
                minHeight: '2.8em',
              }}
            >
              <TypewriterText lines={['Peshawar\'s Trusted Real Estate', 'Experts Since 2015']} startDelay={1.0} />
            </p>
          </motion.div>

          {/* Stats row — rotating gradient border + stagger left-to-right */}
          <motion.div
            variants={heroItemVariants}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 mt-2 px-2 md:px-0"
          >
            {STATS.map(({ end, suffix, label }, i) => (
              <div key={label} className="stat-border-wrapper rounded-[1rem] md:rounded-2xl p-[1px]">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className="glass rounded-[1rem] md:rounded-2xl px-2 py-3 md:px-4 md:py-5 text-center cursor-default h-full flex flex-col justify-center items-center"
                >
                  <motion.p
                    className="stat-number text-2xl md:text-4xl"
                    whileHover={{
                      scale: [1, 1.15, 0.95, 1.05, 1],
                      transition: { duration: 0.4, times: [0, 0.2, 0.5, 0.7, 1] },
                    }}
                  >
                    <AnimatedCounter end={end} suffix={suffix} />
                  </motion.p>
                  <p className="text-white/50 text-[9px] md:text-xs font-label uppercase tracking-widest mt-1 md:mt-2 leading-tight">{label}</p>
                </motion.div>
              </div>
            ))}
          </motion.div>


          {/* Buttons — below stats */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto"
          >
            <Link
              to="/properties"
              className="btn-gold group text-xs md:text-sm px-6 py-3 md:px-8 md:py-3.5 w-[80%] sm:w-auto mx-auto sm:mx-0 flex justify-center items-center"
            >
              Explore Properties
              <motion.span
                className="inline-block"
                initial={{ x: 0, rotate: 0 }}
                whileHover={{ x: 4, rotate: -12 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
            <Link
              to="/contact"
              className="btn-outline group text-xs md:text-sm px-6 py-3 md:px-8 md:py-3.5 w-[80%] sm:w-auto mx-auto sm:mx-0 flex justify-center items-center"
            >
              Talk to an Agent
              <motion.span
                className="inline-block ml-1"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-navy-DEFAULT to-transparent" />
      </section>

      {/* ── Trust Badges Marquee — [REMOVABLE] ── */}
      <TrustMarquee />

      {/* ── Wave Divider — [REMOVABLE] ── */}
      <WaveDivider />

      {/* ═════════════════════ FEATURED PROPERTIES ════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header — slide in from opposite sides */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <FadeUp>
              <span className="section-label mb-4 block">Featured Listings</span>
            </FadeUp>
            <motion.div variants={slideLeftVariant}>
              <h2 className="font-display font-900 text-white leading-tight max-w-md" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
                Handpicked <span className="text-gold-gradient">Premium</span> Properties
              </h2>
            </motion.div>
          </div>
          <motion.div variants={slideRightVariant}>
            <Link
              to="/properties"
              className="btn-outline text-xs flex items-center gap-2"
            >
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Interactive folder gallery — smooth scroll-triggered reveal */}
        <motion.div
          className="w-full flex justify-center mt-2"
          initial={{ opacity: 0, y: 140, scale: 0.85, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {loading ? (
            <div className="text-white/50 text-center mt-10">Loading featured properties...</div>
          ) : (
            <InteractiveFolderGallery
              folderName="Projects & VIP Listings"
              dragHintText="Swipe left/right to browse. Pull down to close."
              photos={properties.length > 0 ? properties.slice(0, 5).map((p, index) => ({ id: p.id || index, image: p.image })) : undefined}
            />
          )}
        </motion.div>

      </section>


      {/* ═══════════════════════════════ SERVICES ══════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(233,196,0,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-14">
            <FadeUp>
              <span className="section-label justify-center mb-4 block">Why Choose Us</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-900 text-white"
                style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', perspective: '800px' }}
              >
                The MJ <span className="text-gold-gradient">Advantage</span>
              </h2>
            </FadeUp>
          </div>

          {/* Flip card cascade */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={flipContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{ perspective: '1200px' }}
          >
            {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={flipCardVariant}
                whileHover={{
                  y: -14,
                  rotateZ: 1.5,
                  scale: 1.02,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 2px 20px rgba(233,196,0,0.2)',
                  borderColor: 'rgba(233,196,0,0.4)',
                  transition: { type: 'spring', stiffness: 200, damping: 20 },
                }}
                whileTap={{ scale: 0.96, rotateZ: 0 }}
                className="liquid-glass rounded-[2rem] p-6 lg:p-8 cursor-pointer border border-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-6 text-gold-500"
                  whileHover={{
                    rotate: 15,
                    scale: 1.18,
                    backgroundColor: 'rgba(233,196,0,0.22)',
                    transition: { type: 'spring', stiffness: 300 },
                  }}
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="font-900 text-white text-lg mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ NEW SERVICES SECTION ════════════════════════════ */}
      <CoreServicesGrid />


      {/* ── Video Modal — only mounts when open, iframe lazy loads ── */}
      <AnimatePresence>
        {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
      </AnimatePresence>

      {/* ═══════════════════════════════ PREMIUM TESTIMONIAL ════════════════════════════ */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden bg-[#02040a]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <span className="section-label mb-4 block">Client Success</span>
              <h2 className="font-display font-800 text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                Trusted by <br/><span className="text-gold-gradient">Peshawar's Elite</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                Our reputation is built on the success and satisfaction of our VIP clients. Hear what they have to say about the MJ Marketing experience.
              </p>
            </motion.div>

            <motion.div
              variants={zoomBlurVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="relative liquid-glass p-10 md:p-14 rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_2px_20px_rgba(255,255,255,0.05)]"
            >
              <div className="flex gap-1.5 mb-8 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              <blockquote className="text-white font-medium text-xl md:text-[1.35rem] leading-relaxed mb-10 font-body relative z-10">
                "MJ Marketing found us our dream villa in T.V Colony within 3 weeks. Their market knowledge, transparency, and VIP professionalism is truly unmatched in Peshawar."
              </blockquote>

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 p-[2px] shadow-gold-sm">
                  <div className="w-full h-full bg-[#040714] rounded-full flex items-center justify-center">
                    <span className="text-gold-500 font-bold text-lg font-display">AK</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg font-display">Ahmed Khan</p>
                  <p className="text-gold-500/80 text-xs tracking-[0.15em] uppercase font-bold mt-1">T.V Colony Resident</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BlueprintHours rendered with motion variants from within its own component */}
      <BlueprintHours />
    </>
  );
}
