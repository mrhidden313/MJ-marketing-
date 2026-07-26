import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../components/ui/team-section';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await supabase.from('team_members').select('*');
        if (error) throw error;
        setMembers(data as (TeamMember & { id: string })[]);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  return { members, loading };
}
