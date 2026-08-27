import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Activity } from '../types';
import DetailModal from './ui/DetailModal';

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data } = await supabase.from('activities').select('*').order('created_at', { ascending: false });
    if (data) setActivities(data);
  };

  if (activities.length === 0) return null;

  return (
    <section className="relative py-24 px-6 lg:px-12 bg-[#02040a] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-bold uppercase tracking-[0.2em] text-xs">Our Momentum</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-900 text-white mt-4 tracking-tight">
            Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Activities</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
            Discover our latest events, project launches, and community engagements driving the future of real estate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedActivity(activity)}
              className="group relative h-[380px] w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer shadow-lg hover:shadow-gold-500/10 transition-all duration-500"
            >
              {/* Media Background */}
              <div className="absolute inset-0 z-0">
                {activity.image ? (
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : activity.video_url ? (
                  <video src={activity.video_url} autoPlay muted loop playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                  {activity.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>
                <div className="mt-6 flex items-center text-gold-400 text-xs font-bold uppercase tracking-wider gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Read More <span className="text-lg leading-none">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DetailModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.title || ''}
        description={selectedActivity?.description || ''}
        image={selectedActivity?.image}
        video_url={selectedActivity?.video_url}
        type="Activity"
      />
    </section>
  );
}
