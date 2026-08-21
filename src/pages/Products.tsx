import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplet, Leaf } from 'lucide-react';
import PremiumProductShowcase from '../components/PremiumProductShowcase';

export default function Products() {
  return (
    <div className="bg-[#0b0514] min-h-screen relative overflow-x-hidden w-full flex flex-col">
      <SEO 
        title="Exclusive Products | MJ GROUP OF COMPANIES" 
        description="Browse our exclusive products and developments. Secure your future with our premium offerings."
      />
      
      <PremiumProductShowcase />

      {/* The About Section */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-32 mt-16 flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-8">
        
        {/* Single Product Image - Stretched to match text box */}
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-5/12 flex"
        >
          <div className="w-full rounded-[2rem] shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-white/5 overflow-hidden relative">
            <img 
              src="/shampoo-bottle.jpeg" 
              alt="MJ Herbal Hair Shampoo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* About Text - Scaled Down 40% */}
        <motion.div 
          initial={{ opacity: 0, x: 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-7/12 glass p-6 md:p-8 rounded-[2rem] border border-white/10 bg-[#0b0514]/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col justify-center"
        >
          {/* Subtle inner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-600/20 blur-[60px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mb-4 relative z-10">
            Advanced Organic Formula
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-light mb-6 relative z-10">
            Formulated through years of research, MJ Herbal Hair Shampoo perfectly balances modern hair science with raw, unadulterated nature. Experience a complete hair transformation.
          </p>

          <ul className="space-y-3 relative z-10">
            {[
              {
                title: "Complete Hair Fall Defense",
                desc: "Fortifies hair at the cellular level, instantly halting daily breakage and reinforcing roots.",
                icon: <Sparkles className="text-purple-400 w-5 h-5" />,
                bg: "bg-purple-500/10",
                border: "border-purple-500/30"
              },
              {
                title: "25+ Rare Botanical Extracts",
                desc: "A potent concentrate of pure Onion Extract, Shikakai, Brahmi, Bhringraj, Amla, and Reetha.",
                icon: <Leaf className="text-green-400 w-5 h-5" />,
                bg: "bg-green-500/10",
                border: "border-green-500/30"
              },
              {
                title: "Intense Hydration & Repair",
                desc: "Infused with Aloe Vera and Argan oil to deeply moisturize dry scalp and repair split ends.",
                icon: <Droplet className="text-blue-400 w-5 h-5" />,
                bg: "bg-blue-500/10",
                border: "border-blue-500/30"
              },
              {
                title: "100% Toxin-Free Guarantee",
                desc: "Zero sulfates, parabens, or harsh artificial chemicals. Completely safe for color-treated hair.",
                icon: <Shield className="text-rose-400 w-5 h-5" />,
                bg: "bg-rose-500/10",
                border: "border-rose-500/30"
              }
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                whileHover={{ scale: 1.02, x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-start gap-4 p-3 rounded-xl cursor-default transition-colors border border-transparent hover:border-white/5"
              >
                <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0 border ${item.border}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg tracking-wide">{item.title}</h4>
                  <p className="text-white/60 text-xs md:text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
