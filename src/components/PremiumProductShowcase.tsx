import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PremiumProductShowcase() {
  const [hasDropped, setHasDropped] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    // Standard trigger, drop immediately and safely
    const timer = setTimeout(() => {
      setHasDropped(true);
      if (!audioPlayed) {
        setAudioPlayed(true);
        const audio = new Audio('/bubble.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio autoplay blocked', e));
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [audioPlayed]);

  return (
    <div className="relative w-full min-h-screen bg-[#0b0514] overflow-hidden flex flex-col items-center justify-between py-16 md:py-24">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: hasDropped ? [1, 1.5, 1.2] : 1,
            opacity: hasDropped ? [0.2, 0.5, 0.3] : 0.2
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[60vw] h-[60vw] bg-purple-600/30 rounded-full blur-[120px] absolute mix-blend-screen" 
        />
      </div>

      {/* Hero Text */}
      <div className="relative text-center z-20 w-full px-4 shrink-0">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold-400 font-label tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block"
        >
          MJ Cosmetics Exclusive
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-900 text-white leading-tight"
        >
          Nature's Secret for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Perfect Hair</span>
        </motion.h2>
      </div>

      {/* The Splash Effect (Liquid Ripples) */}
      <AnimatePresence>
        {hasDropped && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full pointer-events-none flex items-center justify-center mt-40">
            {/* Base Water Glow (pool) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute w-[80vw] h-[40vw] max-w-[1200px] max-h-[600px] bg-purple-600/30 rounded-[100%] blur-[80px]"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Ripple 1 */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.9, borderWidth: '15px' }}
              animate={{ width: 1200, height: 600, opacity: 0, borderWidth: '1px' }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute rounded-[100%] border-purple-500/60"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Ripple 2 */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: '25px' }}
              animate={{ width: 900, height: 450, opacity: 0, borderWidth: '2px' }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="absolute rounded-[100%] border-fuchsia-400/70"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Ripple 3 (Extra Water) */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.7, borderWidth: '10px' }}
              animate={{ width: 1400, height: 700, opacity: 0, borderWidth: '1px' }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
              className="absolute rounded-[100%] border-pink-500/40"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Flying Droplets */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 600, 
                  y: (Math.random() - 1) * 400, 
                  scale: Math.random() * 2,
                  opacity: 0 
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                className="absolute w-3 h-3 md:w-5 md:h-5 bg-gradient-to-b from-purple-300 to-fuchsia-500 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.9)]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* The Dropping Bottle (Absolute centering inside normal flow) */}
      <motion.div 
        initial={{ y: -1500, rotate: 15 }}
        animate={{ 
          y: hasDropped ? 0 : -1500, 
          rotate: hasDropped ? 0 : 15
        }}
        transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 12,
          mass: 1.5
        }}
        className="relative top-auto left-auto transform-none z-50 w-[85%] md:w-[30%] max-w-[360px] pointer-events-none mt-12"
      >
        <motion.img 
          animate={{ y: hasDropped ? [0, -10, 0] : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          src="/bottle-transparent.png" 
          alt="MJ Herbal Hair Shampoo" 
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(168,85,247,0.5)]"
        />
      </motion.div>

      {/* Floating Ingredients (Left) */}
      <AnimatePresence>
        {hasDropped && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end gap-4 text-right"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-colors cursor-default"
            >
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-end gap-2 text-lg">
                Onion Power <Leaf size={18} />
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Rich in sulfur, helps reduce hair fall and boosts rapid growth.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-colors cursor-default mt-4"
            >
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-end gap-2 text-lg">
                Amla Extract <Droplets size={18} />
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Strengthens hair roots and promotes new natural hair growth.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ingredients (Right) */}
      <AnimatePresence>
        {hasDropped && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 z-20 flex flex-col items-start gap-4 text-left"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-colors cursor-default"
            >
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-start gap-2 text-lg">
                <CheckCircle2 size={18} /> Reetha
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Natural cleanser that gently cleanses scalp without stripping oils.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-colors cursor-default mt-4"
            >
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-start gap-2 text-lg">
                <ShieldCheck size={18} /> 25+ Herbs
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">A powerful blend of Shikakai, Brahmi, Bhringraj, and Methi Dana.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges Bottom (Curved Path 30% smaller) */}
      <AnimatePresence>
        {hasDropped && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 1.5,
                  staggerChildren: 0.2
                }
              }
            }}
            className="relative w-full flex justify-center gap-4 md:gap-16 px-4 z-30 shrink-0 mt-8"
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
                  hidden: { opacity: 0, x: 140, y: 105, scale: 0.3 }, // 30% smaller path
                  visible: { 
                    opacity: 1, 
                    x: [140, 70, 0], 
                    y: [105, -20, 0], 
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
        )}
      </AnimatePresence>
      
    </div>
  );
}
