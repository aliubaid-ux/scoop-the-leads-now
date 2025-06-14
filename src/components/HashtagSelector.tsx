import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import { ClickTooltip } from '@/components/ui/ClickTooltip';
import { AdvancedJournalistRequest } from './AdvancedJournalistRequest';

// Restore original complete set of hashtags for Journalist Requests group, now removing generic/spammy entries.
const HASHTAG_GROUPS: Record<string, { hashtags: string[]; caution?: boolean; tooltip?: string }> = {
  'Journalist Requests': {
    hashtags: [
      "#journorequest",
      "#journorequests",
      "#prrequest",
      "#prrequests",
      "#mediarequest",
      "#mediarequests",
      "#requestforsources",
      "#pressrequest",
      "#urgentrequest",
      "#harorequest",
      "#haro",
      "#journalistrequest",
      "#journalistrequests",
      "#reporterrequest",
      "#sourcesneeded",
      "#sourcewanted",
      "#journoquery",
      "#mediaquery",
      "#mediaqueryrequest",
      "#newrequest",
      "#editorialrequest",
      "#workingonastory",
      "#lookingforasource",
      "#freelancejournalist",
      "#editorsrequest",
      "#newsdeskrequest"
      // Removed: "#request", "#journo", "#journalist"
    ]
  },
  'Podcast / Media Guest': {
    hashtags: [
      '#podcastguest', '#guestinterview', '#guestneeded'
    ],
    caution: true,
    tooltip: 'This group sometimes turns up self-promotion or unrelated podcast guest posts.'
  },
  'Healthcare / Medical': {
    hashtags: [
      '#healthcarerequest', '#doctorrequest', '#medicalexpert'
    ]
  },
  'Tech & Startup Requests': {
    hashtags: [
      '#startuplookout', '#techjournorequest', '#founderrequest'
    ],
    caution: true,
    tooltip: 'Some startup/VC tags attract self-promotion. Use with negative keywords.'
  }
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

  const buildGroupSearchUrl = (tags: string[]) => {
    if (!tags.length) return "#";
    let query = tags.length > 1 ? `(${tags.join(' OR ')})` : tags[0];
    return `https://twitter.com/search?q=${encodeURIComponent(query)}&f=live`;
  };

  // The hashtag groups as sections
  const groupEntries = Object.entries(HASHTAG_GROUPS);

  return (
    <div className="flex flex-col gap-8">
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
                    Tip: To filter out spammy/self-promo results, add negative keywords in your custom search
                    (e.g. <b>-SEO -guestpost</b>) in the search builder.
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
        <CardContent className="space-y-6">
          {groupEntries.map(([groupName, { hashtags, caution, tooltip }], idx) => {
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
      {/* Place the Journalist Search Tools dropdown as its own section */}
      <div>
        <AdvancedJournalistRequest />
      </div>
    </div>
  );
};

// File is getting long. You should consider asking to refactor it!
