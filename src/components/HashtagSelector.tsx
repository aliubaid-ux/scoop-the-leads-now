
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const HASHTAG_GROUPS = {
  'Journalist Requests': [
    '#journorequest', '#journorequests', '#prrequest', '#mediarequest', '#requestforsources',
    '#journalistrequest', '#helpareporter', '#sourcewanted', '#quoterequest', '#callforsources',
    '#interviewrequest', '#expertsneeded', '#sourcealert', '#lookingforsources', '#pressrequest',
    '#medialeads', '#urgentrequest', '#requestforcomment', '#needquotes', '#needexperts'
  ],
  'Podcast/Interview Invites': [
    '#podcastguest', '#guestinterview', '#guestneeded', '#interviewguest', '#youtubeguest',
    '#audioguest', '#videointerview', '#guestcallout', '#interviewopportunity', '#podcastinterview',
    '#expertinterview', '#guestspot', '#liveinterview', '#instagramliveguest', '#twitterspaceguest',
    '#linkedinliveguest'
  ],
  'Guest Posts & Content': [
    '#guestpost', '#guestwriter', '#contributewriter', '#acceptingguestposts', '#writeforus',
    '#submitarticle', '#guestblogger', '#contentcollab', '#blogsubmission', '#articlepitch',
    '#pitchus', '#openforcontributions', '#submissionopen', '#opencallforwriters',
    '#publishingopportunity', '#guestcontributor'
  ],
  'Expert Opinions': [
    '#casestudyrequest', '#expertopinion', '#expertinsight', '#callforexperts',
    '#personalstoriesneeded', '#lookingforexperts', '#shareyourstory', '#opinionwanted',
    '#thoughtleadercallout', '#callforcomment', '#addyourvoice', '#commentrequest'
  ],
  'Broad Discovery': [
    '#journalist', '#editorialrequest', '#freelancejournalist', '#pitching', '#mediarelations',
    '#haroreplacement', '#pitchme', '#lookingforguests', '#collabrequest', '#writerswanted',
    '#expertsavailable'
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
