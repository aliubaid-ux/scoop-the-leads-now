
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
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="shadow border-0 bg-slate-50/80 dark:bg-gray-900/75 backdrop-blur max-w-2xl mx-auto my-2">
      <CardHeader
        onClick={() => setExpanded((v) => !v)}
        className="pb-2 cursor-pointer flex items-center gap-2 select-none hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition rounded-t"
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
            <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-100">
              Journalist Search Tools
            </CardTitle>
            <CardDescription className="text-xs max-w-md text-gray-600 dark:text-gray-400">
              Power journalist searches and curated media feeds. Use these links for in-depth media sourcing and story leads.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`p-0 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        {expanded && (
          <div>
            {advSearches.map((search, i) => (
              <div
                key={search.label}
                className="px-6 py-4 flex flex-col gap-1 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
              >
                <a
                  href={search.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-medium text-blue-700 dark:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                >
                  {search.label}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {search.description}
                </span>
                {i < advSearches.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
