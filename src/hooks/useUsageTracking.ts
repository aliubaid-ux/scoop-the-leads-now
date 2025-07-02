import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const FREE_SEARCH_LIMIT = 3;

export const useUsageTracking = () => {
  const { user } = useAuth();
  const [searchCount, setSearchCount] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Generate or get session ID
  useEffect(() => {
    let session = localStorage.getItem('journoscoop-session');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('journoscoop-session', session);
    }
    setSessionId(session);
  }, []);

  // Load current usage count
  useEffect(() => {
    const loadUsage = async () => {
      if (!sessionId) return;

      try {
        const { data, error } = await supabase
          .from('usage_tracking')
          .select('search_count')
          .eq('session_id', sessionId)
          .eq('action_type', 'search_generated')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('Error loading usage:', error);
          return;
        }

        const currentCount = data?.search_count || 0;
        setSearchCount(currentCount);
        setIsLimitReached(!user && currentCount >= FREE_SEARCH_LIMIT);
      } catch (error) {
        console.error('Error loading usage:', error);
      }
    };

    loadUsage();
  }, [sessionId, user]);

  const trackSearch = useCallback(async () => {
    if (!sessionId) return false;

    // If user is authenticated, allow unlimited searches
    if (user) {
      try {
        await supabase
          .from('usage_tracking')
          .upsert({
            session_id: sessionId,
            user_id: user.id,
            action_type: 'search_generated',
            search_count: searchCount + 1
          }, {
            onConflict: 'session_id,action_type,user_id'
          });
        
        setSearchCount(prev => prev + 1);
        return true;
      } catch (error) {
        console.error('Error tracking authenticated search:', error);
        return true; // Allow search even if tracking fails for authenticated users
      }
    }

    // For anonymous users, check limit
    if (searchCount >= FREE_SEARCH_LIMIT) {
      setIsLimitReached(true);
      return false;
    }

    try {
      const newCount = searchCount + 1;
      
      await supabase
        .from('usage_tracking')
        .upsert({
          session_id: sessionId,
          user_id: null,
          action_type: 'search_generated',
          search_count: newCount
        }, {
          onConflict: 'session_id,action_type'
        });

      setSearchCount(newCount);
      setIsLimitReached(newCount >= FREE_SEARCH_LIMIT);
      return true;
    } catch (error) {
      console.error('Error tracking search:', error);
      return false;
    }
  }, [sessionId, searchCount, user]);

  const resetUsage = useCallback(() => {
    setSearchCount(0);
    setIsLimitReached(false);
  }, []);

  return {
    searchCount,
    isLimitReached,
    remainingSearches: Math.max(0, FREE_SEARCH_LIMIT - searchCount),
    trackSearch,
    resetUsage,
    isAuthenticated: !!user,
    freeSearchLimit: FREE_SEARCH_LIMIT
  };
};