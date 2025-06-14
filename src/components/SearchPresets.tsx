import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Save, Trash2, ExternalLink, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchPreset {
  id: string;
  name: string;
  hashtags: string[];
  phrases: string[];
  keywords: string;
  lastUsed: string;
}

interface SearchPresetsProps {
  selectedHashtags: string[];
  selectedPhrases: string[];
  setSelectedHashtags: (hashtags: string[]) => void;
  setSelectedPhrases: (phrases: string[]) => void;
  customKeywords: string;
}

export const SearchPresets = ({
  selectedHashtags,
  selectedPhrases,
  setSelectedHashtags,
  setSelectedPhrases,
  customKeywords
}: SearchPresetsProps) => {
  const [presets, setPresets] = useState<SearchPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedPresets = localStorage.getItem('journoscoop-presets');
    if (savedPresets) {
      // Update for backward compatibility (no phrases array in old presets)
      const parsed = JSON.parse(savedPresets);
      const withPhrases = parsed.map((p: any) => ({
        ...p,
        phrases: Array.isArray(p.phrases) ? p.phrases : [],
      }));
      setPresets(withPhrases);
    }
  }, []);

  const savePresets = (updatedPresets: SearchPreset[]) => {
    setPresets(updatedPresets);
    localStorage.setItem('journoscoop-presets', JSON.stringify(updatedPresets));
  };

  const saveCurrentSearch = () => {
    if (!newPresetName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your search preset.",
        variant: "destructive"
      });
      return;
    }

    if (
      selectedHashtags.length === 0 &&
      selectedPhrases.length === 0 &&
      !customKeywords.trim()
    ) {
      toast({
        title: "Nothing to save",
        description: "Please select hashtags, phrases or add keywords before saving.",
        variant: "destructive"
      });
      return;
    }

    const newPreset: SearchPreset = {
      id: Date.now().toString(),
      name: newPresetName.trim(),
      hashtags: selectedHashtags,
      phrases: selectedPhrases,
      keywords: customKeywords,
      lastUsed: new Date().toISOString()
    };

    const updatedPresets = [...presets, newPreset];
    savePresets(updatedPresets);
    setNewPresetName('');

    toast({
      title: "Preset saved!",
      description: `"${newPreset.name}" has been saved to your presets.`
    });
  };

  const deletePreset = (id: string) => {
    const updatedPresets = presets.filter(p => p.id !== id);
    savePresets(updatedPresets);
    toast({
      title: "Preset deleted",
      description: "The search preset has been removed."
    });
  };

  const openPresetSearch = (preset: SearchPreset) => {
    const searchTerms = [];
    if (preset.hashtags.length > 0) {
      if (preset.hashtags.length > 1) {
        searchTerms.push(`(${preset.hashtags.join(' OR ')})`);
      } else {
        searchTerms.push(...preset.hashtags);
      }
    }
    if (preset.phrases && preset.phrases.length > 0) {
      preset.phrases.forEach(phrase => {
        searchTerms.push(`"${phrase}"`);
      });
    }
    if (preset.keywords && preset.keywords.trim()) {
      const keywords = preset.keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k);
      keywords.forEach(keyword => {
        if (keyword.includes(' ')) {
          searchTerms.push(`"${keyword}"`);
        } else {
          searchTerms.push(keyword);
        }
      });
    }

    const query = encodeURIComponent(searchTerms.join(' '));
    const url = `https://twitter.com/search?q=${query}&f=live`;

    // Update last used
    const updatedPresets = presets.map(p =>
      p.id === preset.id ? { ...p, lastUsed: new Date().toISOString() } : p
    );
    savePresets(updatedPresets);

    window.open(url, '_blank');
    // Also update selected phrases in app state
    setSelectedHashtags(preset.hashtags);
    setSelectedPhrases(preset.phrases ?? []);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Save className="h-5 w-5" />
          Search Presets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter preset name..."
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
          />
          <Button
            onClick={saveCurrentSearch}
            className="w-full"
            variant="outline"
          >
            Save Current Search
          </Button>
        </div>
        {presets.length > 0 && (
          <div className="space-y-3">
            {presets.map((preset) => (
              <div key={preset.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    {preset.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePreset(preset.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 mb-3">
                  {preset.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {preset.hashtags.slice(0, 3).map((hashtag) => (
                        <Badge key={hashtag} variant="secondary" className="text-xs">
                          {hashtag}
                        </Badge>
                      ))}
                      {preset.hashtags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{preset.hashtags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  {preset.phrases && preset.phrases.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {preset.phrases.slice(0, 2).map((phrase) => (
                        <Badge key={phrase} variant="outline" className="text-xs">
                          "{phrase}"
                        </Badge>
                      ))}
                      {preset.phrases.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{preset.phrases.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                  {preset.keywords && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      Keywords: {preset.keywords}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDate(preset.lastUsed)}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => openPresetSearch(preset)}
                    className="h-8"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Search
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {presets.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No saved presets yet. Create your first search preset above!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
