import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Leaf, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PremiumProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDropped, setHasDropped] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();
  
  // Trigger drop on first scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10 && !hasDropped) {
      setHasDropped(true);
    }
  });

  // Play audio only once when dropped
  useEffect(() => {
    if (hasDropped && !audioPlayed) {
      setAudioPlayed(true);
      const audio = new Audio('/bubble.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
    }
  }, [hasDropped, audioPlayed]);

  // Scroll Transforms
  const bottleScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 1.7, 1.7, 1]);
  const splashOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const badgesOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Parallax elements
  const img1Y = useTransform(scrollYProgress, [0.1, 0.4], [1000, 0]);
  const img2Y = useTransform(scrollYProgress, [0.2, 0.5], [1000, 0]);
  const img3Y = useTransform(scrollYProgress, [0.3, 0.6], [1000, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.7], [800, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0b0514]">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-between py-16 md:py-24">
        
        {/* Background Ambient Glow (Fades out) */}
        <motion.div 
          style={{ opacity: splashOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <motion.div 
            animate={{ 
              scale: hasDropped ? [1, 1.5, 1.2] : 1,
              opacity: hasDropped ? [0.2, 0.5, 0.3] : 0.2
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-[60vw] h-[60vw] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen" 
          />
        </motion.div>

        {/* Hero Text (Fades out) */}
        <motion.div style={{ opacity: splashOpacity }} className="relative text-center z-20 w-full px-4 shrink-0">
          {!hasDropped && (
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/60 text-sm mb-4"
            >
              Scroll down to discover
            </motion.p>
          )}
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-400 font-label tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block"
          >
            MJ Cosmetics Exclusive
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-900 text-white leading-tight"
          >
            Nature's Secret for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Perfect Hair</span>
          </motion.h2>
        </motion.div>

        {/* The Splash Effect */}
        <AnimatePresence>
          {hasDropped && (
            <motion.div style={{ opacity: splashOpacity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full pointer-events-none flex items-center justify-center mt-40">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute w-[80vw] h-[40vw] max-w-[1200px] max-h-[600px] bg-purple-600/30 rounded-[100%] blur-[80px]"
                style={{ transform: 'rotateX(60deg)' }}
              />
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0.9, borderWidth: '15px' }}
                animate={{ width: 1200, height: 600, opacity: 0, borderWidth: '1px' }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute rounded-[100%] border-purple-500/60"
                style={{ transform: 'rotateX(60deg)' }}
              />
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: '25px' }}
                animate={{ width: 900, height: 450, opacity: 0, borderWidth: '2px' }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                className="absolute rounded-[100%] border-fuchsia-400/70"
                style={{ transform: 'rotateX(60deg)' }}
              />
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0.7, borderWidth: '10px' }}
                animate={{ width: 1400, height: 700, opacity: 0, borderWidth: '1px' }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
                className="absolute rounded-[100%] border-pink-500/40"
                style={{ transform: 'rotateX(60deg)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Sticky Scaling Bottle */}
        <motion.div 
          style={{ scale: bottleScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[85%] md:w-[30%] max-w-[360px] mt-12 flex justify-center"
        >
          <motion.img 
            initial={{ y: -1500, rotate: 15 }}
            animate={{ 
              y: hasDropped ? [0, -10, 0] : -1500, 
              rotate: hasDropped ? 0 : 15
            }}
            transition={{ 
              y: { 
                type: "spring", stiffness: 60, damping: 12, mass: 1.5,
                // Combine drop spring with endless floating
                repeat: hasDropped ? Infinity : 0, 
                repeatType: "reverse", 
                duration: 4 
              },
              rotate: { type: "spring", stiffness: 60, damping: 12 }
            }}
            src="/bottle-transparent.png" 
            alt="MJ Herbal Hair Shampoo" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(168,85,247,0.5)]"
          />
        </motion.div>

        {/* Parallax Images and About Text */}
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
          <motion.img 
            src="/about1.jpg" 
            style={{ y: img1Y }}
            className="absolute left-[5%] top-[20%] w-48 h-64 object-cover rounded-2xl border-2 border-gold-500/30 shadow-2xl opacity-80 mix-blend-luminosity"
          />
          <motion.img 
            src="/about2.jpg" 
            style={{ y: img2Y }}
            className="absolute right-[5%] top-[10%] w-56 h-72 object-cover rounded-2xl border-2 border-fuchsia-500/30 shadow-2xl opacity-80 mix-blend-luminosity"
          />
          <motion.img 
            src="/about3.jpg" 
            style={{ y: img3Y }}
            className="absolute left-[15%] bottom-[10%] w-64 h-48 object-cover rounded-2xl border-2 border-purple-500/30 shadow-2xl opacity-80 mix-blend-luminosity"
          />
          
          <motion.div 
            style={{ y: textY, opacity: aboutOpacity }}
            className="absolute w-full max-w-2xl text-center px-6 glass p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl z-20 bg-[#0b0514]/60"
          >
            <h3 className="text-4xl font-display font-bold text-gold-400 mb-6">The Essence of Nature</h3>
            <p className="text-white/80 leading-relaxed text-lg mb-6">
              MJ Herbal Hair Shampoo is crafted with over 25 rare herbs including Shikakai, Brahmi, and Bhringraj. Our unique formulation dives deep into your roots, providing unmatched strength and a natural, healthy shine.
            </p>
            <p className="text-white/80 leading-relaxed text-lg">
              Say goodbye to chemical damage. Experience the pure, untamed power of nature perfectly balanced for modern hair care.
            </p>
          </motion.div>
        </div>

        {/* Floating Ingredients and Badges (Fades out) */}
        <motion.div style={{ opacity: badgesOpacity }} className="absolute inset-0 pointer-events-none z-50">
          <AnimatePresence>
            {hasDropped && (
              <>
                {/* Left Cards */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 text-right pointer-events-auto"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
                    className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-default"
                  >
                    <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-end gap-2 text-lg">
                      Onion Power <Leaf size={18} />
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">Rich in sulfur, helps reduce hair fall.</p>
                  </motion.div>
                </motion.div>

                {/* Right Cards */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-start gap-4 text-left pointer-events-auto"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
                    className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-default"
                  >
                    <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-start gap-2 text-lg">
                      <CheckCircle2 size={18} /> Reetha
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">Natural cleanser for the scalp.</p>
                  </motion.div>
                </motion.div>

                {/* Bottom Badges - Curved Animation */}
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.8,
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  className="absolute bottom-12 w-full flex justify-center gap-4 md:gap-16 px-4 pointer-events-auto"
                >
                  {[
                    { text: "Chemical Free", icon: "🌱" },
                    { text: "Sulfate Free", icon: "💧" },
                    { text: "Paraben Free", icon: "🛡️" },
                    { text: "Cruelty Free", icon: "🐰" }
                  ].map((badge) => (
                    <motion.div 
                      key={badge.text}
                      variants={{
                        hidden: { opacity: 0, x: 200, y: 150, scale: 0.3 },
                        visible: { 
                          opacity: 1, 
                          x: [200, 100, 0], 
                          y: [150, -30, 0], 
                          scale: 1, 
                          transition: { 
                            duration: 0.8,
                            times: [0, 0.6, 1],
                            ease: "easeOut"
                          } 
                        }
                      }}
                      whileHover={{ scale: 1.15, y: -10 }}
                      className="flex flex-col items-center gap-3 cursor-pointer"
                    >
                      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-gold-500/40 flex items-center justify-center text-2xl md:text-3xl bg-[#0b0514]/80 backdrop-blur-md shadow-[0_0_20px_rgba(250,204,21,0.1)] transition-colors hover:bg-white/10 hover:border-gold-400">
                        {badge.icon}
                      </div>
                      <span className="text-[10px] md:text-xs text-gold-400 font-bold uppercase tracking-widest text-center max-w-[80px]">
                        {badge.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
