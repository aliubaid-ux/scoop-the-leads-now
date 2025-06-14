
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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
  const [expanded, setExpanded] = useState(true); // expanded by default since it's very prominent now

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 dark:from-blue-900 dark:via-gray-900 dark:to-indigo-950/60 backdrop-blur-lg max-w-2xl mx-auto my-4 ring-2 ring-blue-200 dark:ring-indigo-800 relative overflow-visible">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full shadow-md flex items-center gap-2 border border-blue-200 dark:border-blue-800 font-semibold text-blue-700 dark:text-blue-200 text-lg tracking-tight drop-shadow-lg animate-pulse">
          <Sparkles className="h-5 w-5 text-purple-500 animate-bounce" />
          Journalist Search Tools
          <Sparkles className="h-5 w-5 text-pink-400 animate-bounce" />
        </span>
      </div>
      <CardHeader
        onClick={() => setExpanded((v) => !v)}
        className="pb-2 cursor-pointer flex items-center gap-2 select-none mt-6 hover:bg-blue-50/70 dark:hover:bg-blue-950/25 transition rounded-t relative"
        style={{ userSelect: "none" }}
        aria-expanded={expanded}
      >
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-blue-500 dark:text-blue-300 mr-1" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-500 dark:text-blue-300 mr-1" />
        )}
        <div className="flex items-start gap-2">
          <ExternalLink className="h-5 w-5 mt-0.5 text-blue-600 dark:text-blue-300 flex-shrink-0" />
          <div>
            <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
              <span className="text-gradient bg-gradient-to-r from-indigo-700 via-blue-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-300 dark:via-indigo-400 dark:to-purple-300">
                One-Click Journalist Power Searches
              </span>
            </CardTitle>
            <CardDescription className="text-xs max-w-md text-gray-600 dark:text-gray-400 font-medium">
              Power journalist searches and curated media feeds. Use these for in-depth media sourcing and story leads.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`p-0 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[1100px] opacity-100" : "max-h-0 opacity-0"}`}>
        {expanded && (
          <div>
            <div className="pt-4 px-6 pb-2">
              <ul className="space-y-0">
                {advSearches.map((search, i) => (
                  <li key={search.label}>
                    <a
                      href={search.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center w-full gap-2 text-base font-semibold text-indigo-700 dark:text-indigo-200 px-2 py-2 rounded-md border border-transparent hover:bg-indigo-100 hover:dark:bg-indigo-900 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150 shadow-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1 text-blue-600 group-hover:text-indigo-900 dark:text-indigo-300" />
                      {search.label}
                    </a>
                    <span className="ml-8 text-xs text-gray-600 dark:text-gray-400 block">
                      {search.description}
                    </span>
                    {i < advSearches.length - 1 && (
                      <Separator className="my-4 opacity-60" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
