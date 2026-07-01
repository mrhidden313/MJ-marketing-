import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSequentially() {
      try {
        setLoading(true);
        let lastVisible = null;
        let hasMore = true;

        while (hasMore && isMounted) {
          const q = lastVisible 
            ? query(collection(db, "properties"), limit(1), startAfter(lastVisible))
            : query(collection(db, "properties"), limit(1));
            
          const snapshot = await getDocs(q);
          
          if (snapshot.empty) {
            hasMore = false;
            break;
          }

          const doc = snapshot.docs[0];
          lastVisible = doc;
          const propertyData = { id: doc.id, ...doc.data() };

          if (isMounted) {
            setProperties(prev => {
              // Prevent duplicates in strict mode
              if (prev.find(p => p.id === propertyData.id)) return prev;
              return [...prev, propertyData];
            });
            // Optional: slight delay to guarantee the visual cascading effect
            await new Promise(resolve => setTimeout(resolve, 150)); 
          }
        }
      } catch (error) {
        console.error("Error fetching properties sequentially:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSequentially();

    return () => { isMounted = false; };
  }, []);

  return { properties, loading };
}
