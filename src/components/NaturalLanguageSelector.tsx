
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const CATEGORY_PHRASES: Record<string, string[]> = {
  "Journalist Requests": [
    "looking for sources",
    "journalist request",
    "can anyone comment",
    "quotes wanted",
    "press request",
    "media request"
  ],
  "Podcast / Interview Guest Opportunities": [
    "looking for podcast guests",
    "guest needed",
    "live interview opportunity",
    "be my podcast guest",
    "interview guest wanted"
  ],
  "Seeking Expert Opinions": [
    "seeking expert opinion",
    "need expert advice",
    "insights from experts",
    "comment from specialist"
  ],
  "Personal Stories Requests": [
    "share your story",
    "personal story wanted",
    "featured story opportunity"
  ]
};

interface NaturalLanguageSelectorProps {
  selectedPhrases: string[];
  setSelectedPhrases: (phrases: string[]) => void;
}

export const NaturalLanguageSelector = ({ selectedPhrases, setSelectedPhrases }: NaturalLanguageSelectorProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (cat: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const togglePhrase = (phrase: string) => {
    if (selectedPhrases.includes(phrase)) {
      setSelectedPhrases(selectedPhrases.filter(p => p !== phrase));
    } else {
      setSelectedPhrases([...selectedPhrases, phrase]);
    }
  };

  const selectAllInGroup = (phrases: string[]) => {
    const newPhrases = [...selectedPhrases];
    phrases.forEach(phrase => {
      if (!newPhrases.includes(phrase)) newPhrases.push(phrase);
    });
    setSelectedPhrases(newPhrases);
  };

  const clearAll = () => setSelectedPhrases([]);

  return (
    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Select Natural Language Phrases
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={selectedPhrases.length === 0}
            >
              Clear All
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" className="ml-1">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <span className="text-xs text-gray-600">
                    Add common request phrases to your search for broader coverage (e.g. "looking for sources", "guest needed").
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedPhrases.length} phrases
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(CATEGORY_PHRASES).map(([cat, phrases]) => (
          <div key={cat} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-center mb-3">
              <Button
                variant="ghost"
                onClick={() => toggleGroup(cat)}
                className="flex items-center gap-2 p-0 h-auto font-medium text-gray-700 dark:text-gray-300"
              >
                {expandedGroups[cat] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {cat}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectAllInGroup(phrases)}
                className="text-xs"
              >
                Select All
              </Button>
            </div>
            {expandedGroups[cat] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phrases.map(phrase => (
                  <div key={phrase} className="flex items-center space-x-2">
                    <Checkbox
                      id={phrase}
                      checked={selectedPhrases.includes(phrase)}
                      onCheckedChange={() => togglePhrase(phrase)}
                    />
                    <label
                      htmlFor={phrase}
                      className="text-sm font-mono text-blue-700 dark:text-blue-400 cursor-pointer hover:text-blue-900 dark:hover:text-blue-200"
                    >
                      "{phrase}"
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
}
