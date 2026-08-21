import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion';
import { ArrowRight, MapPin, TrendingUp, Shield, Star, Handshake, Clock, Award, FileCheck, Building2, Users } from 'lucide-react';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { CoreServicesGrid } from '../components/ui/core-services';
import { BlueprintHours } from '../components/ui/blueprint-hours';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';

// ── Smooth FadeUp with Controlled Cinematic Pacing ─────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 35, mass: 0.3 });
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
    stiffness: 70,
    damping: 24,
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
  { icon: Building2, end: 500, suffix: '+', label: 'Properties Sold', sub: 'Across KPK & Peshawar' },
  { icon: Users,     end: 1000, suffix: '+', label: 'Happy Clients', sub: 'Trust & VIP Relations' },
  { icon: Award,     end: 10,  suffix: '+', label: 'Years Experience', sub: 'Established Since 2015' },
  { icon: Shield,    end: 98,  suffix: '%', label: 'Client Satisfaction', sub: 'Verified 100% Deals' },
];

const ADVANTAGES = [
  { icon: MapPin,     title: 'Prime Locations',      desc: 'Exclusive access to Peshawar’s most prestigious and secure communities including DHA & Hayatabad.' },
  { icon: TrendingUp, title: 'High-Yield Returns',   desc: 'Data-driven insights for profitable commercial and residential property investments.' },
  { icon: Shield,     title: '100% Secure & Legal',  desc: 'Government and Excise registered agency. Zero risk, fully verified properties only.' },
  { icon: Star,       title: 'VIP Treatment',        desc: 'Personalized private property hunting and complete hassle-free transfer assistance.' },
  { icon: Handshake,  title: '10+ Years Trust',      desc: 'Over 500 successful transactions and 1000+ happy clients since 2015.' },
  { icon: FileCheck,  title: 'Clear Documentation',  desc: 'Expert legal verification and transparent property documentation assistance.' },
  { icon: Award,      title: 'Market Authority',     desc: 'Recognized as Peshawar’s #1 trusted real estate agency for luxury living.' },
  { icon: Clock,      title: '24/7 VIP Support',     desc: 'Round-the-clock availability for our exclusive investors and clients.' },
];

// ── Main Component ────────────────────────────────────────────────────────
export default function Home() {
  const { properties, loading } = useProperties();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slow down video playback rate slightly for cinematic majesty
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return (
    <>
      <SEO 
        title="MJ GROUP OF COMPANIES | Peshawar's #1 Luxury Real Estate Agency" 
        description="Discover Peshawar's most prestigious real estate. MJ GROUP OF COMPANIES offers exclusive access to luxury homes, VIP projects, and high-yield commercial investments."
        path="/"
        schemaData={{
          "@context": "https://schema.org",
          "@type": ["RealEstateAgent", "LocalBusiness"],
          "name": "MJ GROUP OF COMPANIES",
          "image": "https://mjmarketingofficial.com/logo.png",
          "url": "https://mjmarketingofficial.com",
          "telephone": "+923005522555",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ring Road, Pishtakhara Chowk, Peshawar",
            "addressLocality": "Peshawar",
            "addressRegion": "KPK",
            "addressCountry": "PK"
          },
          "priceRange": "$$$"
        }}
      />
      
      <ScrollProgressBar />

      {/* ═══════════════════════════════ HERO SECTION (PERFECT SPACING & PACING) ═══════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-44 px-6 lg:px-12">

        {/* Background — Reverse-First Ping-Pong Video (10 -> 1 -> 10) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-parallax-bg filter brightness-[0.58] contrast-[1.12]"
          src="/hero-video-rev-pingpong.mp4"
        />

        {/* Luxury Deep Slate/Obsidian Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a17]/90 via-[#070a17]/65 to-[#070a17]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center 40%, rgba(212,175,55,0.08) 0%, transparent 65%)' }} />

        {/* Content Container */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          {/* Transparent Logo Emblem with Brand Typography & Soft Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-8 relative group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gold-500/20 rounded-full blur-2xl pointer-events-none" />
            <img 
              src="/logo-transparent.png" 
              alt="MJ Group Emblem" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] mb-2.5" 
            />
            <span className="text-gold-400 font-display font-900 text-sm sm:text-base tracking-[0.25em] uppercase text-center">
              MJ GROUP
            </span>
            <span className="text-gold-300/80 text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-center -mt-0.5">
              OF COMPANIES
            </span>
          </motion.div>

          {/* Translucent Pill Badge with Generous Breathing Room */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[#080d1f]/90 border border-gold-500/40 rounded-full px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.12)]">
              <span className="text-gold-300 text-xs font-bold uppercase tracking-[0.25em]">
                MJ GROUP OF COMPANIES
              </span>
            </div>
          </motion.div>

          {/* Big Dual-Tone Headline with Pure Solid Yellow Animated Line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8 max-w-4xl"
          >
            <h1 className="font-display font-900 text-white tracking-tight leading-[1.08] text-4xl sm:text-6xl md:text-7xl">
              <span className="sr-only">Peshawar's Premier Luxury Real Estate Agency. </span>
              Building The <br />
              <span className="text-[#ffd700]">Sustainable </span>
              <span className="text-[#ffd700]">Future</span>
            </h1>

            {/* Solid Pure Yellow Line - Center to Both Sides Draw */}
            <div className="relative w-full max-w-xl mx-auto mt-4 h-[3px]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.75, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-[#ffd700] rounded-full origin-center"
              />
            </div>
          </motion.div>

          {/* Subtitle with Clean Spacing */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Delivering strategic, results-driven real estate solutions across luxury residential, commercial, and VIP developments with excellence and verified trust.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/properties"
              className="btn-gold group text-xs sm:text-sm uppercase tracking-wider font-bold px-8 py-4 w-[85%] sm:w-auto flex justify-center items-center gap-2.5 shadow-[0_4px_30px_rgba(212,175,55,0.35)]"
            >
              <ArrowRight size={16} /> EXPLORE OUR PROPERTIES
            </Link>
            
            <Link
              to="/contact"
              className="btn-outline group text-xs sm:text-sm uppercase tracking-wider font-bold px-8 py-4 w-[85%] sm:w-auto flex justify-center items-center gap-2 backdrop-blur-md"
            >
              GET IN TOUCH
            </Link>
          </motion.div>

        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#070a17] to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════ FLOATING STATS ISLAND ═══════════════════════════════ */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 -mt-20 sm:-mt-24 mb-16">
        <div className="rounded-[2rem] bg-[#0c1329]/90 border border-gold-500/25 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-hidden">
          {STATS.map(({ icon: Icon, end, suffix, label, sub }, i) => {
            const isLeft = i < 2;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: isLeft ? -45 : 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 2) * 0.15, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-2 group cursor-default"
              >
                {/* Circular Gold Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-400 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <Icon size={22} />
                </div>

                {/* Number */}
                <p className="stat-number text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter end={end} suffix={suffix} />
                </p>

                {/* Label & Subtitle */}
                <p className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">{label}</p>
                <p className="text-white/40 text-[11px] mt-0.5 font-medium">{sub}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════ FEATURED PROPERTIES ════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label mb-3 block">Handpicked Portfolio</span>
            <h2 className="font-display font-900 text-white text-3xl md:text-5xl leading-tight">
              Featured <span className="text-gold-gradient">Properties</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base mt-2">
              Discover verified prime residential villas, plots, and commercial opportunities in Peshawar.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/properties"
              className="btn-outline text-xs inline-flex items-center gap-2"
            >
              Browse All Listings <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="text-white/40 text-center py-16">Loading luxury listings...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property, idx) => (
              <motion.div
                key={property.id || idx}
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: (idx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <PropertyCard p={property} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Signature Project Folders */}
        <div className="mt-20 pt-12 border-t border-white/[0.06]">
          <FadeUp className="text-center mb-8">
            <span className="section-label justify-center mb-2 block">Interactive Portfolio</span>
            <h3 className="text-2xl font-bold text-white">Signature VIP Project Folders</h3>
          </FadeUp>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <InteractiveFolderGallery
              folderName="Projects & VIP Listings"
              dragHintText="Swipe left/right to browse. Pull down to close."
              photos={properties.length > 0 ? properties.slice(0, 5).map((p, index) => ({ id: p.id || index, image: p.image })) : undefined}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ THE MJ ADVANTAGE ══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-[#050814]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-16">
            <FadeUp>
              <span className="section-label justify-center mb-3 block">Why Choose Us</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display font-900 text-white text-3xl md:text-5xl">
                The MJ <span className="text-gold-gradient">Advantage</span>
              </h2>
            </FadeUp>
          </div>

          {/* Advantage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.95, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  borderColor: 'rgba(212,175,55,0.4)',
                }}
                className="bg-[#080d1f]/80 rounded-3xl p-7 border border-white/[0.07] hover:border-gold-500/40 transition-colors duration-400 group h-full flex flex-col cursor-pointer shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mb-6 text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-400">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-700 text-white text-lg mb-2 group-hover:text-gold-300 transition-colors">{title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mt-auto">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CORE SERVICES ════════════════════════════ */}
      <CoreServicesGrid />

      {/* ═══════════════════════════════ PREMIUM TESTIMONIAL ════════════════════════════ */}
      <section className="relative py-28 px-6 lg:px-12 overflow-hidden bg-[#040611]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="text-left"
            >
              <span className="section-label mb-3 block">Client Success</span>
              <h2 className="font-display font-900 text-white text-3xl md:text-5xl leading-tight mb-6">
                Trusted by <br/><span className="text-gold-gradient">Peshawar's Elite</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md">
                Our reputation is built on the success and satisfaction of our VIP clients. Hear what they have to say about the MJ GROUP OF COMPANIES experience.
              </p>
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#080d1f]/90 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="flex gap-1.5 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              <blockquote className="text-white font-medium text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                "MJ GROUP OF COMPANIES found us our dream villa in T.V Colony within 3 weeks. Their market knowledge, transparency, and VIP professionalism is truly unmatched in Peshawar."
              </blockquote>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 p-[2px]">
                  <div className="w-full h-full bg-[#040714] rounded-full flex items-center justify-center">
                    <span className="text-gold-400 font-bold text-base font-display">AK</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base">Ahmed Khan</p>
                  <p className="text-gold-400/80 text-xs tracking-wider uppercase font-semibold mt-0.5">T.V Colony Resident</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BlueprintHours */}
      <BlueprintHours />
    </>
  );
}
