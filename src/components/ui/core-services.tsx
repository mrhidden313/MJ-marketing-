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
    <section className="relative py-28 px-6 lg:px-12 overflow-hidden bg-[#060917]">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label justify-center mb-3 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-900 text-white text-3xl md:text-5xl mb-4"
          >
            Core <span className="text-gold-gradient">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-sm md:text-base"
          >
            Comprehensive real estate solutions tailored for luxury and high-yield investments in Peshawar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((service, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  borderColor: 'rgba(212,175,55,0.4)',
                }}
                className="relative group overflow-hidden rounded-3xl bg-[#080d1f]/80 border border-white/[0.07] hover:border-gold-500/40 p-7 flex flex-col items-start cursor-pointer h-full transition-colors duration-300 shadow-lg"
              >
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-gold-500/20 transition-all duration-300">
                  <service.icon size={22} className="text-gold-400" />
                </div>

                <h3 className="relative z-10 text-white font-display font-700 text-lg mb-2 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>

                <p className="relative z-10 text-white/50 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>

                <div className="relative z-10 mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400/80 group-hover:text-gold-300 group-hover:translate-x-1 transition-all duration-300">
                  Learn More <ArrowRight size={13} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
