import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
      <Helmet>
        <title>Terms of Service | MJ Marketing</title>
        <meta name="description" content="Terms of Service for MJ Marketing." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert max-w-none text-white/80"
      >
        <h1 className="text-4xl md:text-5xl font-display font-800 text-white mb-8">Terms of Service</h1>
        
        <p className="mb-4">Last updated: July 2026</p>
        
        <h2 className="text-2xl font-bold text-gold-400 mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="mb-4">By accessing our website, you agree to be bound by these Terms of Service and to use our website in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the website.</p>

        <h2 className="text-2xl font-bold text-gold-400 mt-8 mb-4">2. Intellectual Property Rights</h2>
        <p className="mb-4">Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website are owned or controlled by us.</p>

        <h2 className="text-2xl font-bold text-gold-400 mt-8 mb-4">3. User Representations</h2>
        <p className="mb-4">By using the website, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the website through automated or non-human means.</p>

        <h2 className="text-2xl font-bold text-gold-400 mt-8 mb-4">4. Limitations of Liability</h2>
        <p className="mb-4">In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the website.</p>

        <h2 className="text-2xl font-bold text-gold-400 mt-8 mb-4">5. Contact Us</h2>
        <p className="mb-4">In order to resolve a complaint regarding the website or to receive further information regarding use of the website, please contact us at:</p>
        <p className="mb-4">
          <strong>MJ Marketing</strong><br/>
          T.V Colony Swati Phattak, Peshawar Cantt, Peshawar<br/>
          Email: info@mjmarketingofficial.com
        </p>
      </motion.div>
    </div>
  );
}
