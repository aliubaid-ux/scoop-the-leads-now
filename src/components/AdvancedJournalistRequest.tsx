
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const advSearches = [
  {
    label: "Journalist Power Queries",
    url: "https://x.com/search?q=(%23journorequest%20OR%20%23prrequest%20OR%20%23mediarequest%20OR%20%22looking%20for%20a%20source%22%20OR%20%22working%20on%20a%20story%22)%20(%22I%27m%20a%20journalist%22%20OR%20%22I%27m%20a%20writer%22)&src=typed_query&f=live",
    description: 'Find tweets by journalists and writers using a combination of hashtags and keywords.',
  },
  {
    label: "HelpAReporter (Live Tweets)",
    url: "https://x.com/search?q=(from%3AHelpAReporter)&src=typed_query&f=live",
    description: "Browse live tweets from the official HelpAReporter account.",
  },
  {
    label: "PressPlugs Feed",
    url: "https://x.com/PressPlugs",
    description: "Go directly to the PressPlugs feed for ongoing media requests.",
  },
];

export function AdvancedJournalistRequest() {
  const [expanded, setExpanded] = useState(true); // expanded by default

  return (
    <Card className="shadow-md border bg-white dark:bg-gray-950 max-w-2xl mx-auto my-2 transition-colors duration-200">
      <CardHeader
        onClick={() => setExpanded((v) => !v)}
        className="pb-2 cursor-pointer flex items-center gap-2 select-none hover:bg-blue-50/60 dark:hover:bg-blue-950/25 transition rounded-t"
        aria-expanded={expanded}
        style={{ userSelect: "none" }}
      >
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-blue-500 dark:text-blue-300 mr-1" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500 dark:text-blue-300 mr-1" />
        )}
        <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Journalist Search Tools
        </CardTitle>
      </CardHeader>
      <CardContent className={`transition-all duration-300 p-0 ${expanded ? "max-h-[1100px] opacity-100" : "max-h-0 opacity-0"}`}>
        {expanded && (
          <div>
            <CardDescription className="px-6 pt-4 pb-2 text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
              Jump to curated journalist feeds & advanced Twitter searches for fast story leads.
            </CardDescription>
            <ul className="px-6 pb-4 space-y-0">
              {advSearches.map((search, i) => (
                <li key={search.label} className="mb-3 last:mb-0">
                  <a
                    href={search.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-base font-medium text-indigo-700 dark:text-indigo-200 px-2 py-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150"
                  >
                    <ExternalLink className="h-4 w-4 mr-1 text-blue-600 dark:text-indigo-300" />
                    {search.label}
                  </a>
                  <span className="ml-7 text-xs text-gray-600 dark:text-gray-400 block">
                    {search.description}
                  </span>
                  {i < advSearches.length - 1 && (
                    <Separator className="my-3 opacity-60" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
