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
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-32 mt-16 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* Single Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 max-w-md"
        >
          <img 
            src="/shampoo-bottle.jpeg" 
            alt="MJ Herbal Hair Shampoo"
            className="w-full h-auto rounded-[2.5rem] shadow-[0_0_50px_rgba(168,85,247,0.2)] border border-white/5 object-cover"
          />
        </motion.div>

        {/* About Text - Professional & User Friendly */}
        <motion.div 
          initial={{ opacity: 0, x: 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-[#0b0514]/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-fuchsia-600/20 blur-[80px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mb-6">
            Nature's Purest Formula
          </h2>
          <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
            Experience the untamed power of nature perfectly balanced for modern hair care. MJ Herbal Hair Shampoo is carefully crafted to transform your hair naturally.
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/30">
                <Sparkles className="text-purple-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Stops Hair Fall</h4>
                <p className="text-white/60 text-sm mt-1">Fortifies hair at the roots, drastically reducing daily hair loss.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/30">
                <Leaf className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">25+ Rare Herbs</h4>
                <p className="text-white/60 text-sm mt-1">Infused with Shikakai, Brahmi, Bhringraj, and pure Onion extract.</p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Shield className="text-blue-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">100% Chemical Free</h4>
                <p className="text-white/60 text-sm mt-1">No sulfates, parabens, or harsh toxins. Completely safe for daily use.</p>
              </div>
            </li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
