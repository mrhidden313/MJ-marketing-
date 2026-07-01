import React, { useRef } from 'react';
import SEO from '../components/SEO';
import { motion, useScroll } from 'framer-motion';
import { Award, Users, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedTeamSection } from '../components/ui/team-section';
import { useTeamMembers } from '../hooks/useTeamMembers';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const MILESTONES = [
  { year: '2015', event: 'MJ Marketing founded by Abdul Jalil in Peshawar' },
  { year: '2018', event: '200+ transactions milestone reached in Hayatabad & Cantt' },
  { year: '2021', event: 'Commercial division & Investment Advisory launched' },
  { year: '2024', event: '500+ premium properties sold across KPK' },
  { year: '2025', event: 'Registered with Excise (REA/MVD/5781)' },
  { year: '2026', event: 'Leading Peshawar’s Luxury Real Estate Market' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { members, loading } = useTeamMembers();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  return (
    <>
      <SEO 
        title="About Us | MJ Marketing" 
        description="Since 2015, MJ Marketing has been redefining luxury real estate in Peshawar with unparalleled service, expertise, and exclusive market access."
      />
      {/* Header */}
      <section className="pt-36 pb-16 px-6 lg:px-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(233,196,0,0.06) 0%, transparent 100%)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeUp><span className="section-label mb-4 block">Our Story</span></FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="font-display font-800 text-display-lg text-white mb-6 leading-tight">
                Peshawar's Most <span className="text-gold-gradient">Trusted</span> Real Estate Name
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-white/50 leading-relaxed mb-4">
                Founded in 2012, MJ Marketing has been at the forefront of Peshawar's evolving real estate market.
                We began as a small family-run agency in T.V Colony and have grown into one of the city's most respected names.
              </p>
              <p className="text-white/50 leading-relaxed">
                Our philosophy is simple: every client deserves honest advice, transparent dealings, and a property that truly
                matches their life goals. With over 50 expert agents and 500+ completed transactions, we deliver on that promise every time.
              </p>
            </FadeUp>
            <FadeUp delay={0.3} className="mt-8">
              <Link to="/contact" className="btn-gold text-sm">
                Work With Us <ArrowRight size={16} />
              </Link>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden h-80 lg:h-[450px] shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/5 group">
              <img
                src="/about.jpg"
                alt="About MJ Marketing"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
              <div className="absolute bottom-8 left-8 liquid-glass border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                <p className="text-gold-400 font-display font-800 text-2xl tracking-tight">Est. 2012</p>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mt-1">T.V Colony, Peshawar</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════ LUXURY PSYCHOLOGY CARDS ════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label justify-center mb-4 block">Why MJ Marketing</span>
          <h2 className="font-display font-800 text-display-md text-white">
            The Standard of <span className="text-gold-gradient">Excellence</span>
          </h2>
        </FadeUp>
        
        <div className="flex flex-col md:flex-row gap-6 h-[600px] md:h-[500px]">
          {[
            { icon: Award,      title: 'Unyielding Integrity',  desc: 'In luxury real estate, trust is the ultimate currency. Every dealing is strictly confidential and 100% transparent.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
            { icon: Users,      title: 'Elite Network',         desc: 'Access to off-market properties and highly exclusive buyers that you won’t find on public listings.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
            { icon: TrendingUp, title: 'Generational Wealth',   desc: 'We don’t just sell homes; we architect portfolios that secure your family’s financial legacy in Peshawar.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80' },
          ].map(({ icon: Icon, title, desc, img }, i) => (
            <motion.div 
              key={title}
              className="relative flex-1 rounded-[2rem] overflow-hidden group cursor-pointer transition-all duration-700 ease-in-out md:hover:flex-[2]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-[#02040a]">
                <img src={img} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-14 h-14 rounded-full liquid-glass border border-gold-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold-500/10 transition-all duration-500">
                  <Icon size={24} className="text-gold-400" />
                </div>
                <h3 className="font-display font-800 text-white text-2xl mb-3 tracking-wide">{title}</h3>
                <div className="overflow-hidden transition-all duration-700 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
                  <p className="text-white/70 text-sm leading-relaxed pt-2 font-light">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto" ref={containerRef}>
        <FadeUp className="text-center mb-12">
          <span className="section-label justify-center block mb-4">Our Journey</span>
          <h2 className="font-display font-700 text-display-md text-white">
            A Decade of <span className="text-gold-gradient">Excellence</span>
          </h2>
        </FadeUp>
        <div className="relative">
          <motion.div 
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            className="absolute left-[29px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-500/50 to-transparent z-0" 
          />
          <div className="space-y-8">
            {MILESTONES.map(({ year, event }, i) => (
              <FadeUp key={year} delay={i * 0.1}>
                <div className="flex gap-6 items-start pl-4">
                  <div className="relative z-10 w-5 h-5 rounded-full border-2 border-gold-500 bg-navy-DEFAULT shrink-0 mt-0.5" />
                  <div className="glass rounded-xl px-5 py-4 flex-1">
                    <span className="text-gold-500 font-label font-700 text-sm">{year}</span>
                    <p className="text-white/70 text-sm mt-1">{event}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Team Section */}
      <div className="relative z-10 bg-[#02040a]">
        {loading ? (
          <div className="text-center py-20 text-white/50">Loading Team Members...</div>
        ) : (
          <AnimatedTeamSection
            title="Meet Our Experts"
            description="A team of dedicated professionals committed to delivering integrity, innovation, and excellence in every real estate partnership."
            members={members}
          />
        )}
      </div>
    </>
  );
}
