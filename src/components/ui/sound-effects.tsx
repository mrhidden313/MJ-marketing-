import { useEffect } from 'react';

export function SoundEffects() {
  useEffect(() => {
    let ctx: AudioContext | null = null;

    const playSoftClick = () => {
      if (!ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        ctx = new AudioCtx();
      }
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, ctx.currentTime); // Very soft
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only play sound on primary buttons to avoid being annoying
      if (target.closest('button') || target.closest('.btn-gold') || target.closest('.btn-outline')) {
        playSoftClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if (ctx) ctx.close();
    };
  }, []);

  return null;
}
