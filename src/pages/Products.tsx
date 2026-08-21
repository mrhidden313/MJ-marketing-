import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { useProducts } from '../hooks/useProducts';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

export default function Products() {
  const { products, loading } = useProducts();

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <SEO 
        title="Exclusive Products | MJ GROUP OF COMPANIES" 
        description="Browse our exclusive products and developments. Secure your future with our premium offerings."
      />
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <FadeUp>
            <span className="section-label justify-center mb-4 block">Exclusive Offerings</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-900 text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Our <span className="text-gold-gradient">Signature</span> Products
            </h1>
          </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Explore our portfolio of high-end products and exclusive offerings.
              </p>
            </FadeUp>
        </div>

        {/* Products Grid */}
        <div className="mb-32">
          {loading ? (
            <div className="text-center text-white/50 py-12">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-white/50 py-12">No products available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <FadeUp key={product.id} delay={0.1 * (index % 3)}>
                  <div className="liquid-glass rounded-2xl overflow-hidden border border-white/10 group">
                    <div className="relative h-64 overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-white mb-2">{product.title}</h3>
                      <p className="text-gold-400 font-bold mb-4">{product.price}</p>
                      <p className="text-white/60 text-sm line-clamp-3">{product.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}
        </div>

        {/* Interactive folder gallery */}
        <motion.div
          className="w-full flex justify-center mt-10"
          initial={{ opacity: 0, y: 140, scale: 0.85, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {loading ? (
            <div className="text-white/50">Loading gallery...</div>
          ) : (
            <InteractiveFolderGallery
              folderName="Gallery"
              dragHintText="Drag any photo down to close"
              photos={products.length > 0 ? products.slice(0, 5).map((p, index) => ({ id: p.id || index, image: p.image })) : undefined}
            />
          )}
        </motion.div>

        {/* CTA section at bottom */}
        <div className="mt-32 flex flex-col items-center">
           <FadeUp delay={0.3}>
             <h3 className="text-2xl font-bold text-white mb-6">Interested in our products?</h3>
             <Link to="/contact" className="btn-gold group px-8 py-4 text-sm inline-flex items-center gap-2">
                Talk to our Sales Team
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
             </Link>
           </FadeUp>
        </div>

      </div>
    </div>
  );
}
