import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ExternalLink, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SearchBuilderProps {
  selectedHashtags: string[];
  selectedPhrases: string[];
  customKeywords: string;
  setCustomKeywords: (keywords: string) => void;
  onSearchAttempt?: () => Promise<boolean>;
}

export const SearchBuilder = ({
  selectedHashtags,
  selectedPhrases,
  customKeywords,
  setCustomKeywords,
  onSearchAttempt
}: SearchBuilderProps) => {
  const [useOR, setUseOR] = useState(true);
  const [includeLive, setIncludeLive] = useState(true);

  const buildSearchURL = () => {
    const searchTerms = [];

    // Add hashtags
    if (selectedHashtags.length > 0) {
      if (useOR && selectedHashtags.length > 1) {
        searchTerms.push(`(${selectedHashtags.join(' OR ')})`);
      } else {
        searchTerms.push(...selectedHashtags);
      }
    }
    // Add selected natural phrases as quoted strings
    if (selectedPhrases.length > 0) {
      selectedPhrases.forEach(phrase => {
        searchTerms.push(`"${phrase}"`);
      });
    }
    // Add custom keywords
    if (customKeywords.trim()) {
      const keywords = customKeywords.split(',').map(k => k.trim()).filter(k => k);
      keywords.forEach(keyword => {
        if (keyword.includes(' ')) {
          searchTerms.push(`"${keyword}"`);
        } else {
          searchTerms.push(keyword);
        }
      });
    }

    if (searchTerms.length === 0) return '';

    const query = encodeURIComponent(searchTerms.join(' '));
    let url = `https://twitter.com/search?q=${query}`;
    if (includeLive) {
      url += '&f=live';
    }
    return url;
  };

  const openSearch = async () => {
    // Check usage limits if callback is provided
    if (onSearchAttempt) {
      const canProceed = await onSearchAttempt();
      if (!canProceed) return;
    }
    
    const url = buildSearchURL();
    if (url) {
      window.open(url, '_blank');
    }
  };

  const previewQuery = () => {
    const searchTerms = [];
    if (selectedHashtags.length > 0) {
      if (useOR && selectedHashtags.length > 1) {
        searchTerms.push(`(${selectedHashtags.join(' OR ')})`);
      } else {
        searchTerms.push(...selectedHashtags);
      }
    }
    if (selectedPhrases.length > 0) {
      selectedPhrases.forEach(phrase => searchTerms.push(`"${phrase}"`));
    }
    if (customKeywords.trim()) {
      const keywords = customKeywords.split(',').map(k => k.trim()).filter(k => k);
      keywords.forEach(keyword => {
        if (keyword.includes(' ')) {
          searchTerms.push(`"${keyword}"`);
        } else {
          searchTerms.push(keyword);
        }
      });
    }
    return searchTerms.join(' ');
  };

  const handleUseORChange = (checked: boolean | "indeterminate") => {
    setUseOR(checked === true);
  };

  const handleIncludeLiveChange = (checked: boolean | "indeterminate") => {
    setIncludeLive(checked === true);
  };

  // Additional spam-flagging/anti-spam keywords helper
  const hasNegative = /\s-\w+/.test(customKeywords) || customKeywords.trim().startsWith('-');

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Build Your Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Keywords (comma-separated)
          </label>
          <Textarea
            placeholder='e.g., "request for comment", -seo, -guestpost'
            value={customKeywords}
            onChange={(e) => setCustomKeywords(e.target.value)}
            className="min-h-[80px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use quotes for exact phrases, separate multiple terms with commas
          </p>
        </div>

        {/* Anti-spam and negative keyword helper */}
        <div className={`p-3 rounded-lg text-xs ${hasNegative ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100'}`}>
          {hasNegative ? (
            <>✔️ Anti-spam negative keywords detected: results will be cleaner!</>
          ) : (
            <>🛡️ <b>Tip:</b> To filter out spam or self-promotional results, add keywords like <span className="font-mono text-blue-800 dark:text-blue-200">-seo, -guestpost, -contentmarketing</span> to your custom keywords.<br />
            Example: <span className="font-mono text-blue-800 dark:text-blue-200">journalist request, -seo, -promo</span>
            </>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-or"
              checked={useOR}
              onCheckedChange={handleUseORChange}
            />
            <label htmlFor="use-or" className="text-sm text-gray-700 dark:text-gray-300">
              Use OR logic for hashtags (finds tweets with any selected hashtag)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-live"
              checked={includeLive}
              onCheckedChange={handleIncludeLiveChange}
            />
            <label htmlFor="include-live" className="text-sm text-gray-700 dark:text-gray-300">
              Show latest tweets first (&f=live)
            </label>
          </div>
        </div>

        {(selectedHashtags.length > 0 || customKeywords.trim()) && (
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Search Preview:</p>
            <code className="text-sm text-blue-600 dark:text-blue-400 break-all">
              {previewQuery()}
            </code>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={openSearch}
            disabled={selectedHashtags.length === 0 && !customKeywords.trim()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Twitter Search
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Tip: You must be logged into Twitter to reply or DM the journalists.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
