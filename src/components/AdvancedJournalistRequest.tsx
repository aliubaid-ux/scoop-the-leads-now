
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const advSearches = [
  {
    label: "Advanced Journalist Queries",
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
  return (
    <Card className="shadow border-0 mb-3 bg-slate-50/80 dark:bg-gray-900/75 backdrop-blur max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Advanced Journalist Request
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {advSearches.map(search => (
          <div key={search.label} className="space-y-1">
            <a
              href={search.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-300 font-medium hover:underline transition"
            >
              {search.label}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {search.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
