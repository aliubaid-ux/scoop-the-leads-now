import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Search, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UsageData {
  totalSearches: number;
  searchesThisWeek: number;
  searchesToday: number;
  joinDate: string;
}

export const UsageStats = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsageStats();
  }, [user]);

  const loadUsageStats = async () => {
    if (!user) return;
    
    try {
      // Get total searches
      const { data: totalData, error: totalError } = await supabase
        .from('usage_tracking')
        .select('search_count')
        .eq('user_id', user.id)
        .eq('action_type', 'search_generated')
        .maybeSingle();

      if (totalError && totalError.code !== 'PGRST116') throw totalError;

      // Get searches this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { data: weekData, error: weekError } = await supabase
        .from('usage_tracking')
        .select('search_count')
        .eq('user_id', user.id)
        .eq('action_type', 'search_generated')
        .gte('created_at', weekAgo.toISOString())
        .maybeSingle();

      if (weekError && weekError.code !== 'PGRST116') throw weekError;

      // Get searches today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: todayData, error: todayError } = await supabase
        .from('usage_tracking')
        .select('search_count')
        .eq('user_id', user.id)
        .eq('action_type', 'search_generated')
        .gte('created_at', today.toISOString())
        .maybeSingle();

      if (todayError && todayError.code !== 'PGRST116') throw todayError;

      // Get user join date from profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('created_at')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setStats({
        totalSearches: totalData?.search_count || 0,
        searchesThisWeek: weekData?.search_count || 0,
        searchesToday: todayData?.search_count || 0,
        joinDate: profileData?.created_at || user.created_at
      });
    } catch (error) {
      console.error('Error loading usage stats:', error);
      toast({
        title: "Error",
        description: "Failed to load usage statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Unable to load statistics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
          <Search className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSearches}</div>
          <p className="text-xs text-muted-foreground">
            All time searches generated
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.searchesThisWeek}</div>
          <p className="text-xs text-muted-foreground">
            Searches in the last 7 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.searchesToday}</div>
          <p className="text-xs text-muted-foreground">
            Searches generated today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Date(stats.joinDate).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Account creation date
          </p>
        </CardContent>
      </Card>
    </div>
  );
};