import React, { useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, useInView } from 'framer-motion';
import { Shield, Sparkles, Droplet, Leaf, ShoppingBag } from 'lucide-react';
import PremiumProductShowcase from '../components/PremiumProductShowcase';
import { useProducts } from '../hooks/useProducts';
import DetailModal from '../components/ui/DetailModal';
import type { Product } from '../types';

export default function Products() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });
  
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

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

      {/* ═══════════════════════════════ PRODUCT CATALOG ════════════════════════════ */}
      <div className="w-full bg-[#050811] py-24 relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="text-gold-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 mb-4">
              <ShoppingBag size={14} /> Our Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-900 text-white tracking-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Products</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-white/50 py-12">No products available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-gold-500/30 transition-all duration-300 shadow-lg hover:shadow-gold-500/10 flex flex-col h-full"
                >
                  <div className="h-64 relative bg-black overflow-hidden flex items-center justify-center">
                    {product.video_url ? (
                      <video src={product.video_url} autoPlay muted loop playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-[#0b0514]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-transparent" />
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-3 leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">
                        {product.price}
                      </span>
                      <button className="bg-white/10 hover:bg-gold-500 hover:text-black text-white/90 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.title || ''}
        description={selectedProduct?.description || ''}
        image={selectedProduct?.image}
        video_url={selectedProduct?.video_url}
        price={selectedProduct?.price}
        type="Product"
      />
    </div>
  );
}
