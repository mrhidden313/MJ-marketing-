import React, { useRef, useEffect } from 'react';
import { useScroll, useSpring } from 'framer-motion';

interface ScrollVideoProps {
  src: string;
  className?: string;
}

export function ScrollVideo({ src, className = '' }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  
  // A physics spring provides extremely buttery smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (video.duration && !isNaN(video.duration)) {
        // Map the page scroll directly to the video timeline
        video.currentTime = latest * video.duration;
      }
    });

    const onLoadedMetadata = () => {
      video.currentTime = smoothProgress.get() * video.duration;
    };
    
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      unsubscribe();
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [smoothProgress]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      preload="auto"
      style={{ pointerEvents: 'none' }}
    />
  );
}
