import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

const HOURS = [
  { day: 'Monday', time: '09:00 AM - 08:00 PM', status: 'Open' },
  { day: 'Tuesday', time: '09:00 AM - 08:00 PM', status: 'Open' },
  { day: 'Wednesday', time: '09:00 AM - 08:00 PM', status: 'Open' },
  { day: 'Thursday', time: '09:00 AM - 08:00 PM', status: 'Open' },
  { day: 'Friday', time: '09:00 AM - 01:00 PM', status: 'Half Day' },
  { day: 'Saturday', time: '09:00 AM - 08:00 PM', status: 'Open' },
  { day: 'Sunday', time: 'By Appointment Only', status: 'VIP' },
];

export function BlueprintHours() {
  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-[#02040a]">
      {/* Subtle Gold Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Bold Title and Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <span className="section-label mb-4 block">Availability</span>
          <h2 className="font-display font-900 text-white text-5xl lg:text-6xl mb-6 leading-tight">
            Our <span className="text-gold-gradient">Working Hours</span>
          </h2>
          <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
            We operate on a precision-driven schedule to ensure our clients receive uninterrupted, high-tier service. Sunday operations are restricted exclusively to VIP private appointments.
          </p>
          
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-2xl liquid-glass border border-gold-500/20 flex items-center justify-center hover:scale-105 transition-transform shadow-gold-sm">
              <Calendar className="text-gold-500" size={28} />
            </div>
            <div className="w-16 h-16 rounded-2xl liquid-glass border border-gold-500/20 flex items-center justify-center hover:scale-105 transition-transform shadow-gold-sm">
              <Clock className="text-gold-500" size={28} />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Luxury Box Layout for Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative liquid-glass rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="space-y-4">
            {HOURS.map((h, idx) => (
              <motion.div
                key={h.day}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, type: 'spring' }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="text-white font-900 uppercase tracking-wider w-28 group-hover:text-gold-400 transition-colors">
                    {h.day}
                  </span>
                  <span className="text-white/60 font-semibold text-sm">
                    {h.time}
                  </span>
                </div>
                
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  h.status === 'Open' ? 'border-gold-500/30 text-gold-500 bg-gold-500/10' :
                  h.status === 'VIP' ? 'border-white/30 text-white bg-white/10' :
                  'border-orange-500/30 text-orange-400 bg-orange-500/10'
                }`}>
                  {h.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
