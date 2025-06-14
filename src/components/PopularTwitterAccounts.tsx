
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const accounts = [
  {
    name: "HelpAReporter (HARO)",
    url: "https://twitter.com/HelpAReporter",
    desc: "Official HARO feed: Public requests from journalists."
  },
  {
    name: "PressPlugs",
    url: "https://twitter.com/PressPlugs",
    desc: "UK-based ongoing media/journalist requests."
  },
  {
    name: "JournoRequests",
    url: "https://twitter.com/JournoRequests",
    desc: "Established journalist request aggregator."
  }
];

export function PopularTwitterAccounts() {
  return (
    <Card className="shadow border-0 mt-4 bg-slate-50/80 dark:bg-gray-900/80 backdrop-blur max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Popular Twitter Accounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map(acc => (
          <div key={acc.name}>
            <a
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-700 dark:text-blue-300 font-medium hover:underline transition"
            >
              {acc.name}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {acc.desc}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
