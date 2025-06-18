
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const linkedInSearches = [
  {
    label: "#journorequest on LinkedIn",
    url: "https://www.linkedin.com/search/results/content/?keywords=%23journorequest&sortBy=%22date_posted%22",
    description: 'Find LinkedIn posts using the #journorequest hashtag for media opportunities.',
  },
  {
    label: "#prrequest on LinkedIn",
    url: "https://www.linkedin.com/search/results/content/?keywords=%23prrequest&sortBy=%22date_posted%22",
    description: "Browse LinkedIn posts with #prrequest for PR and media requests.",
  },
  {
    label: "#mediarequest on LinkedIn",
    url: "https://www.linkedin.com/search/results/content/?keywords=%23mediarequest&sortBy=%22date_posted%22",
    description: "Explore LinkedIn posts tagged with #mediarequest for story opportunities.",
  },
];

export function LinkedInPROpportunities() {
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
          LinkedIn PR Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className={`transition-all duration-300 p-0 ${expanded ? "max-h-[1100px] opacity-100" : "max-h-0 opacity-0"}`}>
        {expanded && (
          <div>
            <CardDescription className="px-6 pt-4 pb-2 text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
              Discover PR and media opportunities on LinkedIn using targeted hashtag searches.
            </CardDescription>
            <ul className="px-6 pb-4 space-y-0">
              {linkedInSearches.map((search, i) => (
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
                  {i < linkedInSearches.length - 1 && (
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
