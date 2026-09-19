import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';

const PAGES = [
  ['Home', '/'],
  ['Properties', '/properties'],
  ['Products', '/products'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

const CONTACT_INFO = [
  { Icon: Mail,   text: 'jalilkhan0300@gmail.com', href: 'mailto:jalilkhan0300@gmail.com', label: 'Email us' },
  { Icon: MapPin, text: 'Ring Road , Pishtakhara Chowk , Peshawar', href: 'https://maps.app.goo.gl/zUqLBW5xnrjPhQcV9', label: 'View on map' },
];

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61578731589157',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/mjne.ws77',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCP2tgqtgW4MNXbVT2RJgOiw',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@mjnewspk',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.54 3.94-1.65 5.5-1.47 2.06-3.84 3.42-6.38 3.5-2.61.08-5.31-.76-7.14-2.58-1.97-1.96-2.88-4.83-2.3-7.55.51-2.4 2.1-4.5 4.31-5.54 2.21-1.04 4.84-1.02 7.02-.08v4.18c-1.3-.61-2.89-.66-4.22-.16-1.15.43-2.14 1.35-2.58 2.49-.44 1.13-.39 2.45.13 3.54.51 1.09 1.48 1.96 2.64 2.3 1.46.43 3.12.15 4.32-.71 1.01-.73 1.62-1.9 1.63-3.14V.02z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923044522555',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const linkItemVariant = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
};

const getSocialColor = (label: string) => {
  switch (label) {
    case 'Facebook': return '#1877F2';
    case 'Instagram': return '#E4405F';
    case 'YouTube': return '#FF0000';
    case 'TikTok': return '#FFFFFF';
    case 'WhatsApp': return '#25D366';
    default: return '#E9C400';
  }
};

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    window.location.href = `mailto:jalilkhan0300@gmail.com?subject=VIP List Subscription&body=Please add my email (${email}) to the VIP list.`;
    setEmail('');
  };
  return (
    <div className="pt-8 pb-6 px-4 sm:px-8 relative overflow-hidden bg-[#040714]">
      {/* Glow behind the footer card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[400px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Glass Card Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto rounded-[2.5rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_2px_20px_rgba(255,255,255,0.1)] overflow-hidden cursor-default bg-white/[0.02] backdrop-blur-md"
      >
        {/* Animated Shine Sweep from CSS */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] h-full glass-shine-sweep pointer-events-none mix-blend-overlay" />

        {/* Giant Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
          <span className="text-[12rem] md:text-[22rem] font-900 font-display text-white whitespace-nowrap leading-none tracking-tighter">
            MJ GROUP OF COMPANIES
          </span>
        </div>

        <div className="relative z-10 px-8 py-8 md:px-16 lg:py-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Brand (Spans 5 cols) */}
          <motion.div className="md:col-span-12 lg:col-span-5 flex flex-col items-start" variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.img variants={linkItemVariant} src="/logo.png" alt="MJ GROUP OF COMPANIES" className="hidden md:block w-20 h-20 rounded-full bg-white p-2 object-contain mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10" />
            
            <motion.p variants={linkItemVariant} className="text-white/60 text-base leading-relaxed mb-10 font-light" style={{ fontFamily: 'Inter', maxWidth: '380px' }}>
              Redefining luxury real estate in Peshawar. We offer exclusive access to the city's most prestigious properties, with unparalleled service and expertise since 2015.
            </motion.p>

            {/* Social icons */}
            <motion.div variants={linkItemVariant} className="flex gap-4">
              {SOCIALS.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                  style={{ color: getSocialColor(label) }}
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: `0 0 20px ${getSocialColor(label)}40`,
                    borderColor: getSocialColor(label),
                    backgroundColor: `${getSocialColor(label)}10`
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Middle: Quick Links (Spans 3 cols) */}
          <motion.div className="md:col-span-6 lg:col-span-3" variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h4 variants={linkItemVariant} className="text-white font-900 text-sm uppercase tracking-[0.2em] mb-8">Navigation</motion.h4>
            <ul className="space-y-4">
              {PAGES.map(([label, to]) => {
                const isHome = label === 'Home';
                const LinkComponent = isHome ? 'a' : Link;
                const props = isHome ? { href: to } : { to };
                
                return (
                  <motion.li key={label} variants={linkItemVariant}>
                    <LinkComponent
                      {...props as any}
                      className="text-white/50 text-base hover:text-gold-400 transition-colors duration-300 flex items-center group font-light"
                      style={{ fontFamily: 'Inter' }}
                    >
                      <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500 mr-2">
                        <ArrowRight size={14} />
                      </span>
                      {label}
                    </LinkComponent>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right: Contact & VIP (Spans 4 cols) */}
          <motion.div className="md:col-span-6 lg:col-span-4 flex flex-col" variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h4 variants={linkItemVariant} className="text-white font-900 text-sm uppercase tracking-[0.2em] mb-8">Get in Touch</motion.h4>
            
            <ul className="space-y-4">
            <li>
              <a 
                href="tel:0915230522" 
                className="group flex items-center gap-3 text-white/60 hover:text-gold-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all">
                  <Phone size={14} className="group-hover:scale-110 transition-transform" />
                </div>
                091 523 0522
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/923044522555" 
                className="group flex items-center gap-3 text-white/60 hover:text-gold-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all">
                  <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                </div>
                0304 452 2555
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/923324522555" 
                className="group flex items-center gap-3 text-white/60 hover:text-gold-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all">
                  <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                </div>
                0332 452 2555
              </a>
            </li>
            </ul>

            {/* VIP List Input */}
            <motion.div variants={linkItemVariant} className="mt-auto">
              <h5 className="text-white/80 text-xs uppercase tracking-[0.1em] mb-3 font-bold">Join VIP List</h5>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3.5 pl-6 pr-14 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors backdrop-blur-md font-light"
                />
                <button 
                  onClick={handleSubscribe}
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-gold-500 text-black flex items-center justify-center hover:scale-105 hover:shadow-[0_0_15px_rgba(233,196,0,0.4)] transition-all"
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Bottom Bar inside the card */}
        <div className="relative z-10 border-t border-white/10 px-8 py-6 md:px-10 flex flex-col lg:flex-row justify-between items-center gap-4 bg-black/30 backdrop-blur-xl text-sm text-white/50">
          <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
            <p>&copy; {new Date().getFullYear()} MJ GROUP OF COMPANIES. All rights reserved.</p>
            <p className="text-xs text-white/40">Proprietor: ABDUL JALIL | FBR NTN: 2120137279249 | REA: 5781/2024-2025</p>
          </div>
          <div className="text-xs text-white/40 text-center">
            Developed by <span className="text-white/70 font-medium">Mr Farman</span> with <span className="text-gold-400 font-medium">Instantgrowthdigitalagency</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
