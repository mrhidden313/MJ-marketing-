import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  image: string;
  role?: string;
  description?: string;
}

export interface AnimatedTeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  className?: string;
}

const AnimatedTeamSection = React.forwardRef<
  HTMLDivElement,
  AnimatedTeamSectionProps
>(({ title, description, members, className, ...props }, ref) => {
  const containerRef = React.useRef(null);
  const inView = useInView(containerRef, { triggerOnce: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  return (
    <section
      ref={ref}
      className={cn("w-full py-24 lg:py-32 relative overflow-hidden", className)}
      {...props}
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 font-label font-700 tracking-widest uppercase text-sm mb-4 block"
          >
            Leadership
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-900 tracking-tight text-white mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Team Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 hover:border-gold-500/50 transition-colors duration-500 w-[85%] max-w-sm"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#02040a] via-[#02040a]/90 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-display font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gold-400 font-medium tracking-wide uppercase text-[10px] mb-3">
                      {member.role}
                    </p>
                    
                    {/* Animated Description */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <p className="overflow-hidden text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500/0 group-hover:border-gold-500/50 transition-colors duration-500 rounded-bl-lg" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

AnimatedTeamSection.displayName = "AnimatedTeamSection";

export { AnimatedTeamSection };
