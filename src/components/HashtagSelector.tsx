
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ======================
// UPDATED HASHTAG GROUPS
// ======================
const HASHTAG_GROUPS: Record<string, string[]> = {
  'Journalist Requests': [
    '#journorequest', '#journorequests', '#prrequest', '#mediarequest',
    '#requestforsources', '#journalistrequest', '#helpareporter',
    '#sourcewanted', '#quoterequest', '#callforsources', '#interviewrequest',
    '#expertsneeded', '#sourcealert', '#pressrequest', '#urgentrequest',
    '#requestforcomment', '#needquotes', '#needexperts'
  ],
  'Podcast / Interview Guest Opportunities': [
    '#podcastguest', '#guestinterview', '#guestneeded',
    '#interviewguest', '#youtubeguest', '#guestcallout',
    '#interviewopportunity', '#podcastinterview', '#expertinterview',
    '#guestspot', '#liveinterview', '#twitterspaceguest', '#linkedinliveguest'
  ],
  'Seeking Expert Opinions': [
    '#expertopinion', '#expertinsight', '#callforexperts', '#lookingforexperts',
    '#opinionwanted', '#thoughtleadercallout', '#commentrequest',
    '#casestudyrequest', '#addyourvoice'
  ],
  'Personal Stories Requests': [
    '#personalstoriesneeded', '#shareyourstory', '#storyrequest'
  ],
  'Media Discovery': [
    '#journalist', '#editorialrequest', '#freelancejournalist', '#mediarelations',
    '#haroreplacement'
  ],
  // New high-quality/curated categories
  'Science & Academia Calls': [
    '#sciencerequest', '#academicresearch', '#scientistcallout', '#phdresearch', '#professorrequest'
  ],
  'Healthcare / Medical': [
    '#healthcarerequest', '#doctorrequest', '#nurserequest', '#medicalexpert'
  ],
  'Tech & Startup Requests': [
    '#startuplookout', '#techjournorequest', '#startupfounders', '#founderrequest', '#saasrequest', '#vcrequest'
  ]
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
      if (!newHashtags.includes(hashtag)) {
        newHashtags.push(hashtag);
      }
    });
    setSelectedHashtags(newHashtags);
  };

  const clearAll = () => {
    setSelectedHashtags([]);
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
        {Object.entries(HASHTAG_GROUPS).map(([groupName, hashtags]) => (
          <div key={groupName} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-center mb-3">
              <Button
                variant="ghost"
                onClick={() => toggleGroup(groupName)}
                className="flex items-center gap-2 p-0 h-auto font-medium text-gray-700 dark:text-gray-300"
              >
                {expandedGroups[groupName] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {groupName}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectAllInGroup(hashtags)}
                className="text-xs"
              >
                Select All
              </Button>
            </div>

            {expandedGroups[groupName] && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {hashtags.map((hashtag) => (
                  <div key={hashtag} className="flex items-center space-x-2">
                    <Checkbox
                      id={hashtag}
                      checked={selectedHashtags.includes(hashtag)}
                      onCheckedChange={() => toggleHashtag(hashtag)}
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
        ))}
      </CardContent>
    </Card>
  );
};
