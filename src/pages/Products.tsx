import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import PremiumProductShowcase from '../components/PremiumProductShowcase';

export default function Products() {
  return (
    <div className="bg-[#0b0514] min-h-screen relative">
      <SEO 
        title="Exclusive Products | MJ GROUP OF COMPANIES" 
        description="Browse our exclusive products and developments. Secure your future with our premium offerings."
      />
      
      <PremiumProductShowcase />

      {/* The About Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* Single Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 max-w-md"
        >
          <img 
            src="/shampoo-bottle.jpeg" 
            alt="MJ Herbal Hair Shampoo"
            className="w-full h-auto rounded-3xl shadow-2xl border-2 border-gold-500/20"
          />
        </motion.div>

        {/* About Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 glass p-8 md:p-12 rounded-3xl border border-white/10 bg-[#0b0514]/80 backdrop-blur-xl shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-400 mb-8">
            The Essence of Nature
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-6">
            MJ Herbal Hair Shampoo is crafted with over 25 rare herbs including Shikakai, Brahmi, and Bhringraj. Our unique formulation dives deep into your roots, providing unmatched strength and a natural, healthy shine.
          </p>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light">
            Say goodbye to chemical damage. Experience the pure, untamed power of nature perfectly balanced for modern hair care.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
