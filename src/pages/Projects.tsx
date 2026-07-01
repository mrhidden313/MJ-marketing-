import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { useProperties } from '../hooks/useProperties';
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

export default function Projects() {
  const { properties, loading } = useProperties();

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <FadeUp>
            <span className="section-label justify-center mb-4 block">Upcoming Developments</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display font-900 text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Our <span className="text-gold-gradient">Signature</span> Projects
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/60 text-lg leading-relaxed">
              Explore our portfolio of high-end residential and commercial developments. Click the interactive folder below to browse through our master-planned communities.
            </p>
          </FadeUp>
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
            <div className="text-white/50">Loading projects...</div>
          ) : (
            <InteractiveFolderGallery
              folderName="Signature Projects"
              dragHintText="Drag any photo down to close"
              photos={properties.length > 0 ? properties.slice(0, 5).map((p, index) => ({ id: p.id || index, image: p.image })) : undefined}
            />
          )}
        </motion.div>

        {/* CTA section at bottom */}
        <div className="mt-32 flex flex-col items-center">
           <FadeUp delay={0.3}>
             <h3 className="text-2xl font-bold text-white mb-6">Interested in our projects?</h3>
             <Link to="/contact" className="btn-gold group px-8 py-4 text-sm inline-flex items-center gap-2">
                Talk to our Project Consultants
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
