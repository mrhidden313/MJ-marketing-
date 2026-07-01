import React, { useRef, useEffect, useState } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className = '', style = {} }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sources = Array.isArray(src) ? src : [src];
  const currentSrc = sources[currentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      let start: number | null = null;
      const duration = 500;
      
      const animateFadeIn = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        if (progress < 1) {
          setOpacity(progress);
          requestAnimationFrame(animateFadeIn);
        } else {
          setOpacity(1);
        }
      };
      requestAnimationFrame(animateFadeIn);
    };

    const handleTimeUpdate = () => {
      if (!video) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55 && opacity === 1) {
        let start: number | null = null;
        const duration = 550;
        const animateFadeOut = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = (timestamp - start) / duration;
          if (progress < 1) {
            setOpacity(1 - progress);
            requestAnimationFrame(animateFadeOut);
          } else {
            setOpacity(0);
          }
        };
        requestAnimationFrame(animateFadeOut);
      }
    };

    const handleEnded = () => {
      if (sources.length === 1) {
        video.currentTime = 0;
        video.play().catch(() => {});
        handleLoadedData(); // fade back in
      } else {
        setCurrentIndex((prev) => (prev + 1) % sources.length);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentSrc, sources.length]);

  return (
    <video
      ref={videoRef}
      src={currentSrc}
      className={className}
      style={{ ...style, opacity, transition: 'none' }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
