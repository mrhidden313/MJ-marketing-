import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Activity } from '../types';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setActivities(data);
      }
      setLoading(false);
    }
    
    fetchActivities();
  }, []);

  return { activities, loading };
}
