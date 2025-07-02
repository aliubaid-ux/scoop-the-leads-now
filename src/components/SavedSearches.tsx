import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, ExternalLink, Trash2, Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SavedSearch {
  id: string;
  title: string;
  hashtags: string[];
  phrases: string[];
  custom_keywords: string;
  search_url: string;
  created_at: string;
}

export const SavedSearches = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    loadSavedSearches();
  }, [user]);

  const loadSavedSearches = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSearches(data || []);
    } catch (error) {
      console.error('Error loading saved searches:', error);
      toast({
        title: "Error",
        description: "Failed to load saved searches",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSearch = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSearches(searches.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Search deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting search:', error);
      toast({
        title: "Error",
        description: "Failed to delete search",
        variant: "destructive"
      });
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
      {searches.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Star className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No saved searches yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-4">
              Save your favorite search combinations for quick access later.
            </p>
            <Button onClick={() => window.location.href = '/'} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Search
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {searches.map((search) => (
            <Card key={search.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {search.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created {new Date(search.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(search.search_url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSearch(search.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {search.hashtags && search.hashtags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hashtags
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {search.hashtags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {search.phrases && search.phrases.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phrases
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {search.phrases.map((phrase) => (
                          <Badge key={phrase} variant="outline" className="text-xs">
                            "{phrase}"
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {search.custom_keywords && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom Keywords
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        {search.custom_keywords}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};