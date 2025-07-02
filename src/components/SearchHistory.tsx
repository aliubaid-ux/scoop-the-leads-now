import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, ExternalLink, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SearchHistoryItem {
  id: string;
  hashtags: string[];
  phrases: string[];
  custom_keywords: string;
  search_url: string;
  created_at: string;
}

export const SearchHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, [user]);

  const loadSearchHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading search history:', error);
      toast({
        title: "Error",
        description: "Failed to load search history",
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

  return (
    <div className="space-y-4">
      {history.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No search history yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-4">
              Your search history will appear here as you generate searches.
            </p>
            <Button onClick={() => window.location.href = '/'} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Start Searching
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                    
                    <div className="space-y-2">
                      {item.hashtags && item.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.hashtags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {item.phrases && item.phrases.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.phrases.map((phrase) => (
                            <Badge key={phrase} variant="outline" className="text-xs">
                              "{phrase}"
                            </Badge>
                          ))}
                        </div>
                      )}

                      {item.custom_keywords && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          {item.custom_keywords}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(item.search_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Repeat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};