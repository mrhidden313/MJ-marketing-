import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #e9c400, #ffeb80, #e9c400)', boxShadow: '0 0 10px rgba(233,196,0,0.8)' }}
    />
  );
}
