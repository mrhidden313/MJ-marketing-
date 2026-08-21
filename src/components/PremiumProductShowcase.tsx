import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PremiumProductShowcase() {
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    // Trigger the drop animation shortly after component mounts
    const timer = setTimeout(() => {
      setHasDropped(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0b0514] overflow-hidden flex items-center justify-center">
      
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
      <div className="absolute top-24 text-center z-20 w-full px-4">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full pointer-events-none flex items-center justify-center mt-32">
            {/* Ripple 1 */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: '10px' }}
              animate={{ width: 800, height: 400, opacity: 0, borderWidth: '1px' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute rounded-[100%] border-purple-500/50"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Ripple 2 */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: '20px' }}
              animate={{ width: 600, height: 300, opacity: 0, borderWidth: '2px' }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute rounded-[100%] border-fuchsia-400/60"
              style={{ transform: 'rotateX(60deg)' }}
            />
            {/* Flying Droplets */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 400, 
                  y: (Math.random() - 1) * 300, 
                  scale: Math.random() * 1.5,
                  opacity: 0 
                }}
                transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
                className="absolute w-3 h-3 bg-gradient-to-b from-purple-300 to-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* The Dropping Bottle */}
      <motion.div 
        initial={{ y: -800, scale: 1.2, rotate: 15 }}
        animate={{ 
          y: hasDropped ? 0 : -800, 
          scale: hasDropped ? 1 : 1.2,
          rotate: hasDropped ? 0 : 15
        }}
        transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 12,
          mass: 1.5
        }}
        className="relative z-30 w-[70%] md:w-[25%] max-w-[300px] mt-24"
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
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:bg-white/10 transition-colors cursor-default">
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-end gap-2 text-lg">
                Onion Power <Leaf size={18} />
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Rich in sulfur, helps reduce hair fall and boosts rapid growth.</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:bg-white/10 transition-colors cursor-default mt-4">
              <h3 className="text-gold-400 font-bold mb-2 flex items-center justify-end gap-2 text-lg">
                Amla Extract <Droplets size={18} />
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Strengthens hair roots and promotes new natural hair growth.</p>
            </div>
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
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:bg-white/10 transition-colors cursor-default">
              <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2 text-lg">
                <ShieldCheck size={18} /> Reetha
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">Natural cleanser that gently cleanses scalp without stripping oils.</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-[220px] backdrop-blur-xl bg-white/5 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:bg-white/10 transition-colors cursor-default mt-4">
              <h3 className="text-gold-400 font-bold mb-2 flex items-center gap-2 text-lg">
                <CheckCircle2 size={18} /> 25+ Herbs
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">A powerful blend of Shikakai, Brahmi, Bhringraj, and Methi Dana.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges Bottom */}
      <AnimatePresence>
        {hasDropped && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 left-0 w-full flex justify-center gap-6 md:gap-16 px-4 z-30"
          >
            {[
              { text: "Chemical Free", icon: "🌱" },
              { text: "Sulfate Free", icon: "💧" },
              { text: "Paraben Free", icon: "🛡️" },
              { text: "Cruelty Free", icon: "🐰" }
            ].map((badge, i) => (
              <motion.div 
                key={badge.text}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1.5 + (i * 0.1) }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-gold-500/40 flex items-center justify-center text-2xl md:text-3xl bg-[#0b0514]/80 backdrop-blur-md shadow-[0_0_20px_rgba(250,204,21,0.1)]">
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
