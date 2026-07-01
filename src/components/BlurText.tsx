import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className = '' }: BlurTextProps) {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className={`flex flex-wrap justify-center ${className}`} style={{ rowGap: '0.1em' }}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
