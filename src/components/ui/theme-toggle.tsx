import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLight]);

  return (
    <motion.button
      onClick={() => setIsLight(!isLight)}
      className="fixed bottom-24 right-6 z-[9000] w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border"
      style={{
        background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)',
        borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
        boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.5)'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      layout
    >
      <motion.div
        initial={false}
        animate={{ rotate: isLight ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {isLight ? (
          <Moon size={24} className="text-slate-800" />
        ) : (
          <Sun size={24} className="text-gold-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
