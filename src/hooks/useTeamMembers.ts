import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { TeamMember } from '../components/ui/team-section';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for immediate updates
    const unsubscribe = onSnapshot(collection(db, "team_members"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as (TeamMember & { id: string })[];
      
      // Sort members (you can add a 'order' field later if needed, right now we just use them as they come)
      setMembers(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching team members:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { members, loading };
}
