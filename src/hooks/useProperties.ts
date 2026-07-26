import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPropertiesFast() {
      try {
        setLoading(true);
        
        // 1. Fetch EVERYTHING instantly in one ultra-fast request
        const { data: allData, error } = await supabase.from('properties').select('*');
        if (error) throw error;
        
        // 2. Visually load them one by one (Waterfall effect) without network lag
        for (let i = 0; i < allData.length; i++) {
          if (!isMounted) break;
          
          setProperties(prev => {
            if (prev.find(p => p.id === allData[i].id)) return prev;
            return [...prev, allData[i]];
          });
          
          // Tiny 80ms delay just for the beautiful animation
          await new Promise(resolve => setTimeout(resolve, 80)); 
        }

      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPropertiesFast();

    return () => { isMounted = false; };
  }, []);

  return { properties, loading };
}
