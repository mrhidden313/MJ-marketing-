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

      {/* Spacer Glow (Connects the two sections with pink/purple ambient light) */}
      <div className="absolute top-[80vh] left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] bg-fuchsia-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* The About Section */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-32 mt-32 md:mt-48 flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-8">
        
        {/* Single Product Image - Scaled down */}
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-5/12 flex"
        >
          <div className="w-full rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-white/5 overflow-hidden relative">
            <img 
              src="/shampoo-bottle.jpeg" 
              alt="MJ Herbal Hair Shampoo"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </motion.div>

        {/* About Text - Scaled Down & Labeled */}
        <motion.div 
          initial={{ opacity: 0, x: 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-7/12 glass p-5 md:p-6 rounded-3xl border border-white/10 bg-[#0b0514]/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col justify-center"
        >
          {/* Subtle inner glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-600/20 blur-[60px] rounded-full pointer-events-none" />
          
          <h2 className="text-xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mb-3 relative z-10">
            Advanced Organic Formula
          </h2>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light mb-6 relative z-10">
            Formulated through years of research, perfectly balancing modern science with raw nature.
          </p>

          <ul className="space-y-4 relative z-10">
            {[
              {
                label: "Defense",
                labelColor: "text-purple-300 bg-purple-500/20 border-purple-500/30",
                title: "Complete Hair Fall Stop",
                desc: "Instantly halts daily breakage and reinforces roots.",
                icon: <Sparkles className="text-purple-400 w-4 h-4" />,
                bg: "bg-purple-500/10",
                border: "border-purple-500/30"
              },
              {
                label: "Extracts",
                labelColor: "text-green-300 bg-green-500/20 border-green-500/30",
                title: "25+ Rare Botanicals",
                desc: "Pure Onion Extract, Shikakai, Brahmi, Amla, and Reetha.",
                icon: <Leaf className="text-green-400 w-4 h-4" />,
                bg: "bg-green-500/10",
                border: "border-green-500/30"
              },
              {
                label: "Repair",
                labelColor: "text-blue-300 bg-blue-500/20 border-blue-500/30",
                title: "Intense Hydration",
                desc: "Aloe Vera & Argan oil deeply moisturize dry scalp.",
                icon: <Droplet className="text-blue-400 w-4 h-4" />,
                bg: "bg-blue-500/10",
                border: "border-blue-500/30"
              }
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                whileHover={{ scale: 1.03, x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-white/10 group"
              >
                <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0 border ${item.border} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.labelColor}`}>
                      {item.label}
                    </span>
                    <h4 className="text-white font-bold text-sm md:text-base tracking-wide leading-none">{item.title}</h4>
                  </div>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
