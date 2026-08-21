import React, { useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, useInView } from 'framer-motion';
import { Shield, Sparkles, Droplet, Leaf } from 'lucide-react';
import PremiumProductShowcase from '../components/PremiumProductShowcase';

export default function Products() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [isVideoInView]);

  return (
    <div className="bg-[#0b0514] min-h-screen relative overflow-x-hidden w-full flex flex-col">
      <SEO 
        title="MJ Herbal Hair Shampoo | Organic Hair Fall Solution" 
        description="Discover MJ Herbal Hair Shampoo, an advanced organic formula with 25+ rare botanicals for complete hair fall defense and intense hydration."
        path="/products"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "MJ Herbal Hair Shampoo",
          "image": "https://mjmarketingofficial.com/shampoo-bottle.jpeg",
          "description": "Advanced organic formula with 25+ rare botanicals for complete hair fall defense and intense hydration.",
          "brand": {
            "@type": "Brand",
            "name": "MJ Cosmetics"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://mjmarketingofficial.com/products",
            "priceCurrency": "PKR",
            "price": "2500",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      
      <PremiumProductShowcase />

      {/* Spacer Glow (Connects the two sections with pink/purple ambient light) */}
      <div className="absolute top-[80vh] left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] bg-fuchsia-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* The About Section */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-20 md:pb-32 mt-16 md:mt-48 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 lg:gap-16">
        
        {/* Single Product Video - Lazy Loaded & Autoplay on View */}
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full sm:w-3/4 md:w-4/12 lg:w-[35%] mx-auto md:mx-0 flex h-[400px] md:h-auto"
        >
          <div className="w-full h-full rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-white/5 overflow-hidden flex items-center justify-center bg-black/50">
            <video 
              ref={videoRef}
              src="/mj-ads.mp4" 
              muted
              loop
              playsInline
              title="Click to Mute/Unmute"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
              className="w-full h-full object-cover transition-transform duration-700 cursor-pointer"
            />
          </div>
        </motion.div>

        {/* About Text - Scaled Down & Labeled */}
        <motion.div 
          initial={{ opacity: 0, x: 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-8/12 lg:w-[65%] glass p-5 md:p-6 rounded-3xl border border-white/10 bg-[#0b0514]/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col justify-center"
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
                desc: "Instantly halts daily breakage, strengthens weak strands, and deeply reinforces roots from within.",
                icon: <Sparkles className="text-purple-400 w-5 h-5" />,
                bg: "bg-purple-500/10",
                border: "border-purple-500/30",
                hoverBg: "rgba(168, 85, 247, 0.12)",
                hoverBorderClass: "hover:border-purple-500/40"
              },
              {
                label: "Extracts",
                labelColor: "text-green-300 bg-green-500/20 border-green-500/30",
                title: "25+ Rare Botanicals",
                desc: "A pure, potent blend of Onion Extract, Shikakai, Brahmi, Amla, and Reetha for maximum growth.",
                icon: <Leaf className="text-green-400 w-5 h-5" />,
                bg: "bg-green-500/10",
                border: "border-green-500/30",
                hoverBg: "rgba(34, 197, 94, 0.12)",
                hoverBorderClass: "hover:border-green-500/40"
              },
              {
                label: "Repair",
                labelColor: "text-blue-300 bg-blue-500/20 border-blue-500/30",
                title: "Intense Hydration",
                desc: "Aloe Vera & Argan oil deeply moisturize a dry, flaky scalp while restoring natural shine.",
                icon: <Droplet className="text-blue-400 w-5 h-5" />,
                bg: "bg-blue-500/10",
                border: "border-blue-500/30",
                hoverBg: "rgba(59, 130, 246, 0.12)",
                hoverBorderClass: "hover:border-blue-500/40"
              }
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                whileHover={{ scale: 1.03, x: 10, backgroundColor: item.hoverBg }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-colors border border-transparent group ${item.hoverBorderClass}`}
              >
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center shrink-0 border ${item.border} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 mb-2.5">
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.labelColor}`}>
                      {item.label}
                    </span>
                    <h4 className="text-white font-bold text-[15px] md:text-lg tracking-wide leading-snug">{item.title}</h4>
                  </div>
                  <p className="text-white/70 text-[13px] md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
