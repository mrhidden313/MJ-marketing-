"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export interface GalleryPhoto {
  id: string | number;
  image: string;
}

const defaultPhotos: GalleryPhoto[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 2, image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
  { id: 4, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop" },
  { id: 5, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop" },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: string;
  dragHintText?: string;
  className?: string;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Premium Properties",
  dragHintText = "Drag any photo down to close",
  className
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  return (
    <div className={`w-full py-20 relative ${className || ""}`}>
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">

        <div className="relative w-[480px] h-[600px] flex justify-center pointer-events-none z-0 scale-[0.65] sm:scale-75 md:scale-100 origin-center md:origin-center">

          <motion.div 
            className="absolute bottom-6 w-[480px] h-[330px] drop-shadow-2xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
          >
            <div className="absolute top-0 left-0 w-40 h-12 dark-liquid-glass rounded-t-xl border-t border-l border-r border-white/30 overflow-hidden">
               <div className="absolute inset-0 bg-white/20 w-[200%] h-full glass-shine-sweep" />
            </div>
            <div className="absolute top-10 left-0 right-0 bottom-0 dark-liquid-glass rounded-b-xl rounded-tr-xl border border-white/30 shadow-[inset_0_2px_20px_rgba(255,255,255,0.15)] overflow-hidden">
               <div className="absolute inset-0 bg-white/10 w-[200%] h-full glass-shine-sweep" />
            </div>
          </motion.div>

          <div className="absolute bottom-10 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - 2;

              const stackY = hoverFolder ? offset * -10 - 40 : offset * -5;
              const stackX = hoverFolder ? offset * 30 : offset * 3;
              const stackRotate = hoverFolder ? offset * 8 : offset * 3;
              const stackScale = 1 - Math.abs(offset) * 0.03;

              const openY = -180;
              const openX = offset * 200;
              const openRotate = 0;
              const openScale = 1.05;

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen ? true : false}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 100 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  className={`absolute bottom-0 w-[360px] h-[420px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/30 origin-bottom ${isFolderOpen ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
                  animate={!isFolderOpen ? {
                    y: stackY,
                    x: stackX,
                    rotate: stackRotate,
                    scale: stackScale,
                    zIndex: i + 10
                  } : {
                    y: openY,
                    x: openX,
                    rotate: openRotate,
                    scale: openScale,
                    zIndex: 50
                  }}
                  whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <img src={photo.image} alt="Gallery item" loading="lazy" decoding="async" className="w-full h-full object-cover pointer-events-none" />
                </motion.div>
              );
            })}
          </div>



          <motion.div 
            className="absolute bottom-0 w-[480px] h-[270px] drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)] cursor-pointer z-20 pointer-events-auto"
            style={{ transformOrigin: "bottom" }}
            animate={{ 
              opacity: isFolderOpen ? 0 : 1, 
              rotateX: hoverFolder ? -25 : 0, 
              y: hoverFolder ? 10 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto" 
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="w-full h-full dark-liquid-glass rounded-2xl border border-white/30 shadow-[inset_0_2px_20px_rgba(255,255,255,0.2)] relative overflow-hidden flex flex-col items-center justify-end pb-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="absolute inset-0 bg-white/10 w-[200%] h-full glass-shine-sweep" />

              <div className="px-8 py-3 bg-gradient-to-r from-gold-600/20 via-gold-500/40 to-gold-600/20 rounded-full border border-gold-500/30 shadow-[0_0_20px_rgba(233,196,0,0.15)] flex items-center justify-center backdrop-blur-md mb-3 z-10 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(233,196,0,0.3)]">
                <span className="text-gold-100 font-900 tracking-widest text-sm uppercase drop-shadow-md">
                  {folderName}
                </span>
              </div>
              
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-1.5 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] z-10 drop-shadow-md"
              >
                <span>Tap to Open</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 50 }}
          className="absolute bottom-10 px-6 py-3 rounded-full backdrop-blur-md pointer-events-none"
          style={{
            background: 'rgba(12,17,44,0.75)',
            border: '1px solid rgba(233,196,0,0.25)',
            color: 'rgba(233,196,0,0.8)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {dragHintText}
        </motion.div>

      </div>
    </div>
  );
}
