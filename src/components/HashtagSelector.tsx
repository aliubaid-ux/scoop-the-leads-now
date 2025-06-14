
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import { ClickTooltip } from '@/components/ui/ClickTooltip';

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

  const allSelected = (groupHashtags: string[]) =>
    groupHashtags.every(tag => selectedHashtags.includes(tag));
  const anySelected = (groupHashtags: string[]) =>
    groupHashtags.some(tag => selectedHashtags.includes(tag));

  // --- New: Group-specific Twitter search
  const buildGroupSearchUrl = (tags: string[]) => {
    if (!tags.length) return "#";
    let query = tags.length > 1 ? `(${tags.join(' OR ')})` : tags[0];
    return `https://twitter.com/search?q=${encodeURIComponent(query)}&f=live`;
  };

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
            <ClickTooltip
              content={
                <span className="text-xs text-gray-600">
                  Tip: To filter out spammy/self-promo results, add negative keywords in your custom search&nbsp;
                  (e.g. <b>-SEO -guestpost -contentmarketing</b>) in the search builder.
                </span>
              }
              className="max-w-xs"
            >
              <Button type="button" variant="ghost" size="icon" className="ml-1">
                <Info className="h-4 w-4 text-gray-400" />
              </Button>
            </ClickTooltip>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedHashtags.length} hashtags
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(HASHTAG_GROUPS).map(([groupName, { hashtags, caution, tooltip }]) => {
          const groupSelected = hashtags.filter(tag => selectedHashtags.includes(tag));
          const hasGroupSelection = groupSelected.length > 0;

          return (
            <div key={groupName} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50 mb-2">
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
                    <ClickTooltip
                      content={
                        <span className="text-xs text-gray-600">{tooltip}</span>
                      }
                      className="max-w-xs"
                    >
                      <span className="ml-1 align-middle inline-flex">
                        <Info className="h-4 w-4 text-yellow-500" aria-label="More info" />
                      </span>
                    </ClickTooltip>
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
              {/* Group search action: show if this group has any selection */}
              {hasGroupSelection && (
                <div className="flex justify-end mt-4">
                  <a
                    href={buildGroupSearchUrl(groupSelected)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-full shadow-md transition-all hover:scale-105 hover:from-blue-600 hover:to-indigo-600 border-0 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Twitter Search for <span className="font-semibold ml-1">{groupName}</span>
                    </Button>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

// File is getting long. You should consider asking to refactor it!
