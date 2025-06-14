
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import { ClickTooltip } from "@/components/ui/ClickTooltip";

const CATEGORY_PHRASES: Record<string, string[]> = {
  "Journalist Requests": [
    "request for comment",
    "looking for sources",
    "requesting expert input",
    "journalist request",
    "seeking quotes from experts",
    "looking to speak to",
    "can anyone comment",
    "press request",
    "media request",
    "seeking expert reaction",
    "seeking opinions from experts",
    "looking for expert insights",
    "interviewing experts for story",
    "looking for story sources"
  ],
  "Source Alerts": [
    "call for sources",
    "need experts",
    "expert opinion needed",
    "searching for specialist",
    "looking for case studies",
    "seeking real-world examples",
    "source needed for article",
    "looking for industry insiders"
  ],
  "Academic/Scientific Calls": [
    "seeking academic input",
    "looking for researchers",
    "seeking scientific experts",
    "request for academic experts",
    "need scientific comment"
  ],
  "Healthcare and Medical Calls": [
    "medical expert needed",
    "looking for doctors",
    "need healthcare perspective",
    "searching for medical opinion"
  ],
  "Cautious Audience (sometimes self-promo)": [
    "live interview opportunity",
    "be my podcast guest",
    "podcast guest wanted"
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

  const deselectAllInGroup = (phrases: string[]) => {
    setSelectedPhrases(selectedPhrases.filter(p => !phrases.includes(p)));
  };

  const clearAll = () => setSelectedPhrases([]);

  const allSelected = (groupPhrases: string[]) =>
    groupPhrases.every(phrase => selectedPhrases.includes(phrase));
  const anySelected = (groupPhrases: string[]) =>
    groupPhrases.some(phrase => selectedPhrases.includes(phrase));

  // -- New: Show group-level actionable search button
  const buildGroupSearchUrl = (phrases: string[]) => {
    if (!phrases.length) return "#";
    let query = phrases.map(p => `"${p}"`).join(' OR ');
    return `https://twitter.com/search?q=${encodeURIComponent(query)}&f=live`;
  };

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
            <ClickTooltip
              content={
                <span className="text-xs text-gray-600">
                  Add common request phrases to your search for broader coverage (e.g. "looking for sources", "guest needed").
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
          Selected: {selectedPhrases.length} phrases
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(CATEGORY_PHRASES).map(([cat, phrases]) => {
          const groupSelected = phrases.filter(p => selectedPhrases.includes(p));
          const hasGroupSelection = groupSelected.length > 0;

          return (
            <div key={cat} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50 mb-2">
              <div className="flex justify-between items-center mb-3">
                <Button
                  variant="ghost"
                  type="button"
                  aria-label={expandedGroups[cat] ? `Collapse ${cat}` : `Expand ${cat}`}
                  aria-expanded={!!expandedGroups[cat]}
                  onClick={() => toggleGroup(cat)}
                  className="flex items-center gap-2 p-0 h-auto font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-blue-100/50 dark:hover:bg-gray-600/30 cursor-pointer"
                  style={{ userSelect: "none" }}
                >
                  {expandedGroups[cat] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {cat}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectAllInGroup(phrases)}
                    className="text-xs"
                    disabled={allSelected(phrases)}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deselectAllInGroup(phrases)}
                    className="text-xs"
                    disabled={!anySelected(phrases)}
                    style={{ marginLeft: 4 }}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedGroups[cat] ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                aria-hidden={!expandedGroups[cat]}
              >
                {expandedGroups[cat] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phrases.map(phrase => (
                      <div key={phrase} className="flex items-center space-x-2">
                        <Checkbox
                          id={phrase}
                          checked={selectedPhrases.includes(phrase)}
                          onCheckedChange={() => togglePhrase(phrase)}
                          aria-checked={selectedPhrases.includes(phrase)}
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
              {/* --- Group search action: show if this group has any selection --- */}
              {hasGroupSelection && (
                <div className="flex justify-end mt-4">
                  <a
                    href={buildGroupSearchUrl(groupSelected)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-5 py-2 rounded-full shadow-md transition-all hover:scale-105 hover:from-fuchsia-600 hover:to-pink-600 border-0 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Twitter Search for <span className="font-semibold ml-1">{cat}</span>
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
