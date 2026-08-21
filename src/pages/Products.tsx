import React from 'react';
import SEO from '../components/SEO';
import PremiumProductShowcase from '../components/PremiumProductShowcase';

export default function Products() {
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
