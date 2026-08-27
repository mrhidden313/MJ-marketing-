import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Tag, MapPin } from 'lucide-react';

export interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image?: string;
  video_url?: string;
  price?: string;
  location?: string;
  features?: string[];
  type?: 'Property' | 'Product' | 'Activity';
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  description,
  image,
  video_url,
  price,
  location,
  features,
  type = 'Property'
}: DetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasMedia = !!(image || video_url);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#080d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm text-white transition-all border border-white/10 hover:scale-110"
            >
              <X size={24} />
            </button>

            {/* Media Section (Left) */}
            {hasMedia && (
              <div className="w-full md:w-1/2 relative bg-black flex-shrink-0 flex items-center justify-center overflow-hidden h-[300px] md:h-auto">
                {video_url ? (
                  <video
                    ref={videoRef}
                    src={video_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Gradient overlay for blending */}
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080d1f] to-transparent hidden md:block" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080d1f] to-transparent md:hidden" />
              </div>
            )}

            {/* Content Section (Right) */}
            <div className={`w-full flex-1 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar ${!hasMedia ? 'items-center text-center' : ''}`}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest rounded-full">
                    {type}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-900 text-white mb-2 leading-tight">
                  {title}
                </h2>
                {location && (
                  <div className="flex items-center gap-2 text-white/50 text-sm mt-2">
                    <MapPin size={16} className="text-gold-400" />
                    <span>{location}</span>
                  </div>
                )}
              </div>

              {price && (
                <div className="mb-8">
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Pricing / Value</p>
                  <p className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">
                    {price}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <p className="text-sm text-white/50 uppercase tracking-widest mb-3">Details</p>
                <div className="text-white/80 leading-relaxed font-light whitespace-pre-wrap">
                  {description}
                </div>
              </div>

              {features && features.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-3">Key Highlights</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                        <Tag size={14} className="text-gold-400 shrink-0" />
                        <span className="truncate" title={feature}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Action Button (e.g. Inquire Now) */}
              <div className="mt-auto pt-8">
                <a 
                  href={`https://wa.me/923044522555?text=I am interested in the ${type}: ${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-gradient text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <Play size={18} fill="currentColor" />
                  {type === 'Product' ? 'Inquire to Buy' : 'Express Interest'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
