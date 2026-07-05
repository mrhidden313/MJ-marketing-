import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight, ExternalLink } from 'lucide-react';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const INFO = [
  { icon: Phone,         label: 'VIP Direct Line',    value: '+92 300 5522555',      href: 'tel:+923005522555' },
  { icon: MessageCircle, label: 'WhatsApp',           value: '+92 300 5522555',      href: 'https://wa.me/923005522555' },
  { icon: Mail,          label: 'Private Email',      value: 'jalilkhan0300@gmail.com', href: 'mailto:jalilkhan0300@gmail.com' },
  { icon: MapPin,        label: 'Headquarters',       value: 'Ring Road , Pishtakhara Chowk , Peshawar',  href: 'https://maps.app.goo.gl/UbCALsZHu9Y9bFqW9' },
];

const inputClass = "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:outline-none focus:border-transparent transition-colors font-light font-display";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', inquiry: '', message: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Consultation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Inquiry:* ${formData.inquiry}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/923005522555?text=${text}`, '_blank');
    setFormData({ name: '', phone: '', email: '', inquiry: '', message: '' }); // Clear form
  };

  return (
    <>
      <SEO 
        title="Contact Us | MJ GROUP OF COMPANIES" 
        description="Get in touch with Peshawar's leading real estate experts. Our team is ready to assist you with secure investments and luxury property acquisitions."
      />
      {/* Cinematic Header */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 overflow-hidden bg-[#02040a]">
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gold-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <FadeUp>
            <span className="section-label justify-center mb-6 block">VIP Concierge</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-900 text-display-lg text-white mb-6 leading-tight">
              Get in <span className="text-gold-gradient">Touch</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Experience unparalleled real estate advisory. Connect with our senior consultants to discuss your next luxury investment in Peshawar.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Contact Info Blocks */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1}>
              <h2 className="font-display font-800 text-white text-3xl mb-8">Direct Access</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {INFO.map((item, i) => (
                <FadeUp key={item.label} delay={0.15 + i * 0.05}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group liquid-glass p-6 rounded-3xl border border-white/10 flex items-center gap-5 hover:border-gold-500/40 transition-all duration-500 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 group-hover:scale-110 transition-all duration-500">
                      <item.icon size={22} className="text-white group-hover:text-gold-500 transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-[0.15em] font-bold mb-1">{item.label}</p>
                      <p className="text-white font-medium text-lg group-hover:text-gold-400 transition-colors">{item.value}</p>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>

            {/* Premium Working Hours Block */}
            <FadeUp delay={0.4}>
              <div className="mt-8 liquid-glass p-8 rounded-3xl border border-gold-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
                <Clock className="absolute -top-6 -right-6 w-32 h-32 text-gold-500/5 group-hover:text-gold-500/10 transition-colors duration-700" />
                
                <h3 className="text-gold-500 font-bold text-sm uppercase tracking-[0.15em] mb-4">Operating Hours</h3>
                <div className="space-y-2 text-white/80 font-light">
                  <div className="flex justify-between"><span>Mon - Sat</span> <span>09:00 AM - 08:00 PM</span></div>
                  <div className="flex justify-between text-gold-400 font-medium pt-2 border-t border-white/10 mt-2"><span>Sunday</span> <span>Private Appointments</span></div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: Premium Form */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <div className="liquid-glass rounded-[2.5rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="font-display font-800 text-white text-3xl mb-3">Request a Consultation</h2>
              <p className="text-white/40 text-sm mb-10 font-light">Your information is strictly confidential. A senior advisor will contact you shortly.</p>

              <form className="space-y-8 relative z-10" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" placeholder="Full Name" className={inputClass} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-hover:w-full transition-all duration-500" />
                  </div>
                  <div className="relative group">
                    <input type="tel" placeholder="Phone Number" className={inputClass} required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
                
                <div className="relative group">
                  <input type="email" placeholder="Email Address" className={inputClass} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-hover:w-full transition-all duration-500" />
                </div>
                
                <div className="relative group">
                  <select className={inputClass + " appearance-none cursor-pointer text-white/70"} required value={formData.inquiry} onChange={e => setFormData({...formData, inquiry: e.target.value})}>
                    <option value="" disabled>Nature of Inquiry</option>
                    <option className="bg-[#040714]" value="Buying Luxury Property">Buying Luxury Property</option>
                    <option className="bg-[#040714]" value="Selling My Property">Selling My Property</option>
                    <option className="bg-[#040714]" value="Investment Portfolio">Investment Portfolio</option>
                  </select>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-hover:w-full transition-all duration-500" />
                </div>
                
                <div className="relative group">
                  <textarea rows={4} placeholder="How can we assist you?" className={inputClass + ' resize-none'} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 group-focus-within:w-full transition-all duration-500" />
                </div>
                
                <button type="submit" className="btn-gold w-full text-base py-4 flex items-center justify-center gap-2 group mt-4">
                  Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ═══════════════════════════════ PREMIUM MAP SECTION ════════════════════════════ */}
      <section className="relative h-[500px] w-full mt-20 group">
        <div className="hidden md:block absolute inset-0 bg-[#02040a] opacity-30 pointer-events-none z-10" />
        
        {/* Top Floating Badge */}
        <div className="absolute top-10 left-0 w-full flex justify-center z-20 pointer-events-none">
          <FadeUp className="liquid-glass px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <p className="text-white font-bold tracking-widest uppercase text-[10px] md:text-sm flex items-center gap-2">
              <MapPin className="text-gold-500" size={16} /> MJ GROUP OF COMPANIES Office
            </p>
          </FadeUp>
        </div>

        {/* Custom Premium "Open in Maps" Button Overlay */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <a 
            href="https://maps.app.goo.gl/UbCALsZHu9Y9bFqW9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 md:gap-3 bg-black/70 backdrop-blur-xl border border-gold-500/50 text-white font-bold uppercase tracking-widest text-[10px] md:text-sm px-5 py-2.5 md:px-8 md:py-4 rounded-full shadow-[0_0_30px_rgba(233,196,0,0.2)] hover:shadow-[0_0_60px_rgba(233,196,0,0.4)] hover:bg-gold-500 hover:text-black hover:scale-105 transition-all duration-400 group-hover:-translate-y-2 whitespace-nowrap"
          >
            Open in Google Maps <ExternalLink size={14} className="shrink-0 md:w-[18px] md:h-[18px]" />
          </a>
        </div>

        <iframe
          src="https://maps.google.com/maps?q=33.963379,71.501152&t=m&z=15&output=embed&iwloc=near"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-70 md:opacity-80 pointer-events-none md:pointer-events-auto"
        />
      </section>
    </>
  );
}
