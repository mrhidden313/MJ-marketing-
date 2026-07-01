import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, BadgeDollarSign, LineChart, Megaphone, Calculator, Castle, Map, Building, FileSignature, ArrowRight } from 'lucide-react';

const CORE_SERVICES = [
  { title: 'Residential Sales', icon: Home, color: 'from-blue-500 to-cyan-400', desc: 'Find your perfect family home.' },
  { title: 'Commercial Sales', icon: Building2, color: 'from-purple-500 to-pink-500', desc: 'Premium commercial spaces.' },
  { title: 'Buying & Selling', icon: BadgeDollarSign, color: 'from-emerald-400 to-teal-500', desc: 'Seamless transaction process.' },
  { title: 'Investment Consulting', icon: LineChart, color: 'from-amber-400 to-orange-500', desc: 'High ROI property investments.' },
  { title: 'Property Marketing', icon: Megaphone, color: 'from-red-400 to-rose-600', desc: 'Maximum exposure for your property.' },
  { title: 'Property Valuation', icon: Calculator, color: 'from-indigo-400 to-blue-600', desc: 'Accurate market assessments.' },
  { title: 'Luxury Villas', icon: Castle, color: 'from-yellow-400 to-gold-600', desc: 'Exclusive high-end residences.' },
  { title: 'Legal Assistance', icon: FileSignature, color: 'from-slate-300 to-gray-500', desc: 'Hassle-free documentation.' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
};

export function CoreServicesGrid() {
  return (
    <section className="relative py-32 px-6 lg:px-12 overflow-hidden bg-[#02040a]">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label justify-center mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-900 text-white text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Core <span className="text-gold-gradient">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            Comprehensive real estate solutions tailored for luxury and high-yield investments in Peshawar.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {CORE_SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                boxShadow: '0 25px 50px rgba(233,196,0,0.12), inset 0 2px 20px rgba(255,255,255,0.08)',
                transition: { type: 'spring', stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.96 }}
              className="relative group overflow-hidden rounded-[1.5rem] bg-white/[0.02] border border-white/[0.08] md:border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] md:shadow-none hover:border-gold-500/30 backdrop-blur-md p-8 flex flex-col items-start cursor-pointer h-full transition-all duration-500"
            >
              {/* Animated Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
              
              <div className="relative z-10 w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <service.icon size={22} className="text-white group-hover:text-gold-400 transition-colors duration-500" />
              </div>

              <h3 className="relative z-10 text-white font-bold text-lg mb-2 leading-tight group-hover:text-gold-300 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="relative z-10 text-white/40 text-sm mb-6 flex-grow">
                {service.desc}
              </p>

              <div className="relative z-10 mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Explore <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
