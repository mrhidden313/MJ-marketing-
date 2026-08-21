import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import PremiumProductShowcase from '../components/PremiumProductShowcase';

export default function Products() {
  return (
    <div className="bg-[#0b0514] min-h-[300vh] relative">
      <SEO 
        title="Exclusive Products | MJ GROUP OF COMPANIES" 
        description="Browse our exclusive products and developments. Secure your future with our premium offerings."
      />
      
      <PremiumProductShowcase />

      {/* The Parallax About Section that slides up behind the fixed bottle */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 mt-[100vh] flex flex-col items-center">
        
        {/* Pictures */}
        <div className="relative w-full h-[600px] mb-24 pointer-events-none">
          <motion.img 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            src="/about1.jpg" 
            className="absolute left-[5%] top-0 w-48 md:w-64 aspect-[3/4] object-cover rounded-3xl shadow-2xl border-2 border-gold-500/20"
          />
          <motion.img 
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            src="/about2.jpg" 
            className="absolute right-[5%] top-24 w-56 md:w-72 aspect-[3/4] object-cover rounded-3xl shadow-2xl border-2 border-fuchsia-500/20"
          />
          <motion.img 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            src="/about3.jpg" 
            className="absolute left-[20%] bottom-0 w-64 md:w-80 aspect-[4/3] object-cover rounded-3xl shadow-2xl border-2 border-purple-500/20"
          />
        </div>

        {/* About Text */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 md:p-16 rounded-3xl border border-white/10 max-w-3xl text-center bg-[#0b0514]/80 backdrop-blur-xl shadow-2xl"
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
