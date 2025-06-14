
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ===============================
// CURATED HIGH-QUALITY HASHTAG GROUPS (NO SPAM)
// ===============================
const HASHTAG_GROUPS: Record<string, { hashtags: string[]; caution?: boolean; tooltip?: string }> = {
  'Journalist Requests (Quality)': {
    hashtags: [
      '#journorequest', '#journorequests', '#prrequest', '#mediarequest',
      '#requestforsources', '#journalistrequest', '#callforsources', '#sourcewanted',
      '#quoterequest', '#pressrequest', '#requestforcomment', '#needquotes',
      '#needexperts'
    ]
  },
  'Requests for Comment': {
    hashtags: [
      '#requestforcomment', '#callforcomment', '#expertcomment', '#commentrequest'
    ]
  },
  'Source Calls by Topic': {
    hashtags: [
      '#expertsneeded', '#sourcealert', '#techjournorequest'
      // Removed: '#sciencejourno', '#phdresearch', '#startupfounders', '#medialookout'
      // These are either scientific/spam-prone or duplicative
    ]
  },
  'Podcast / Media Guest': {
    hashtags: [
      '#podcastguest', '#guestinterview', '#interviewguest', '#guestneeded',
      '#interviewopportunity', '#guestspot', '#liveinterview',
      '#linkedinliveguest', '#twitterspaceguest'
    ],
    caution: true,
    tooltip: 'This group sometimes turns up self-promotion or unrelated podcast guest posts. Review results carefully!'
  },
  'Science & Academia Calls': {
    hashtags: [
      '#sciencerequest', '#academicresearch', '#professorrequest'
      // Removed: '#scientistcallout', '#phdresearch' (both are spam-prone or duplicative)
    ],
    caution: true,
    tooltip: 'This group is more specialized and can sometimes be used for research survey requests. Check relevancy!'
  },
  'Healthcare / Medical': {
    hashtags: [
      '#healthcarerequest', '#doctorrequest', '#nurserequest', '#medicalexpert'
    ]
  },
  'Tech & Startup Requests': {
    hashtags: [
      '#startuplookout', '#techjournorequest', '#founderrequest', '#saasrequest', '#vcrequest'
      // Removed: '#startupfounders' (prone to VC/promo spam)
    ],
    caution: true,
    tooltip: 'Startups/VC tags can have some self-promotion. Use with negative keywords for best results.'
  },
  'Media Industry / Discovery': {
    hashtags: [
      '#journalist', '#editorialrequest', '#freelancejournalist', '#mediarelations'
      // Removed: '#haroreplacement' (often spammy)
    ]
  },
};

interface HashtagSelectorProps {
  selectedHashtags: string[];
  setSelectedHashtags: (hashtags: string[]) => void;
}

export const HashtagSelector = ({ selectedHashtags, setSelectedHashtags }: HashtagSelectorProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const selectAllInGroup = (groupHashtags: string[]) => {
    const newHashtags = [...selectedHashtags];
    groupHashtags.forEach(hashtag => {
      if (!newHashtags.includes(hashtag)) newHashtags.push(hashtag);
    });
    setSelectedHashtags(newHashtags);
  };

  const deselectAllInGroup = (groupHashtags: string[]) => {
    setSelectedHashtags(selectedHashtags.filter(h => !groupHashtags.includes(h)));
  };

  const clearAll = () => {
    setSelectedHashtags([]);
  };

  // Group helpers
  const allSelected = (groupHashtags: string[]) =>
    groupHashtags.every(tag => selectedHashtags.includes(tag));
  const anySelected = (groupHashtags: string[]) =>
    groupHashtags.some(tag => selectedHashtags.includes(tag));

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Select Hashtag Groups
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={selectedHashtags.length === 0}
            >
              Clear All
            </Button>
            {/* Info tooltip for using negative filtering */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="ml-1">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <span className="text-xs text-gray-600">
                    Tip: To filter out spammy/self-promo results, add negative keywords in your custom search&nbsp;
                    (e.g. <b>-SEO -guestpost -contentmarketing</b>) in the search builder.
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedHashtags.length} hashtags
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(HASHTAG_GROUPS).map(([groupName, { hashtags, caution, tooltip }]) => (
          <div key={groupName} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  onClick={() => toggleGroup(groupName)}
                  className="flex items-center gap-2 p-0 h-auto font-medium text-gray-700 dark:text-gray-300"
                  aria-label={expandedGroups[groupName] ? `Collapse ${groupName}` : `Expand ${groupName}`}
                  aria-expanded={!!expandedGroups[groupName]}
                  type="button"
                  style={{ userSelect: "none" }}
                >
                  {expandedGroups[groupName] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {groupName}
                </Button>
                {caution && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 align-middle inline-flex">
                          <Info className="h-4 w-4 text-yellow-500" aria-label="More info" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <span className="text-xs text-gray-600">{tooltip}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectAllInGroup(hashtags)}
                  className="text-xs"
                  disabled={allSelected(hashtags)}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deselectAllInGroup(hashtags)}
                  className="text-xs"
                  disabled={!anySelected(hashtags)}
                  style={{ marginLeft: 4 }}
                >
                  Deselect All
                </Button>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${expandedGroups[groupName] ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
              aria-hidden={!expandedGroups[groupName]}
            >
              {expandedGroups[groupName] && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hashtags.map((hashtag) => (
                    <div key={hashtag} className="flex items-center space-x-2">
                      <Checkbox
                        id={hashtag}
                        checked={selectedHashtags.includes(hashtag)}
                        onCheckedChange={() => toggleHashtag(hashtag)}
                        aria-checked={selectedHashtags.includes(hashtag)}
                      />
                      <label
                        htmlFor={hashtag}
                        className="text-sm font-mono text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {hashtag}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
