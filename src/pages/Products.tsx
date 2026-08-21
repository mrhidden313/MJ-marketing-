import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { useProducts } from '../hooks/useProducts';
import PremiumProductShowcase from '../components/PremiumProductShowcase';
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
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { InteractiveFolderGallery } from '../components/ui/interactive-folder-gallery';
import { useProducts } from '../hooks/useProducts';
import PremiumProductShowcase from '../components/PremiumProductShowcase';
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
    <div className="bg-[#0b0514]">
      <SEO 
        title="Exclusive Products | MJ GROUP OF COMPANIES" 
        description="Browse our exclusive products and developments. Secure your future with our premium offerings."
      />
      
      <PremiumProductShowcase />
    </div>
  );
}
