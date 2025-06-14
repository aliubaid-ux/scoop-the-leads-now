
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Copy, Check, UserPlus2 } from "lucide-react";

const SHARE_TEXT =
  "🚀 Check out JournoScoop – Find Real-Time Journalist & Podcast Requests on Twitter! 🔎 https://journoscoop.lovable.app";

const SOCIAL_LINKS = [
  {
    label: "Share on Twitter/X",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`,
    icon: (
      <svg aria-hidden="true" width={15} height={15} viewBox="0 0 24 24" fill="currentColor"><path d="M22.162 5.656c-.792.352-1.644.592-2.538.704a4.412 4.412 0 0 0 1.927-2.433 8.727 8.727 0 0 1-2.764 1.056 4.387 4.387 0 0 0-7.469 3.996A12.456 12.456 0 0 1 3.09 4.624c-.46.79-.722 1.707-.722 2.69 0 1.853.944 3.485 2.381 4.444-.875-.028-1.7-.267-2.42-.668-.001.022-.001.045-.001.068 0 2.593 1.846 4.756 4.297 5.245-.448.122-.921.188-1.41.188-.345 0-.679-.034-1.005-.096.681 2.125 2.664 3.672 5.013 3.712A8.799 8.799 0 0 1 2 20.292c-.651 0-1.294-.038-1.931-.11A12.448 12.448 0 0 0 8.262 22.385c7.59 0 11.75-6.3 11.75-11.77 0-.18-.004-.36-.012-.54A8.503 8.503 0 0 0 24 4.556a8.607 8.607 0 0 1-2.486.703l.648-.607z"/></svg>
    ),
    color: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  {
    label: "Share on LinkedIn",
    href: `https://www.linkedin.com/shareArticle?mini=true&url=https://journoscoop.lovable.app&title=JournoScoop%20-%20Real-Time%20Journalist%20Requests%20on%20Twitter`,
    icon: (
      <svg aria-hidden="true" width={15} height={15} fill="currentColor" viewBox="0 0 24 24"><path d="M6.94 6.577a2.117 2.117 0 11-.001-4.235 2.117 2.117 0 010 4.235zm.03 2.254c-1.767 0-3.1 1.174-3.1 3.27V20h3.328v-7.69c0-.595.07-1.153.425-1.525.35-.37.895-.516 1.418-.516 1.144 0 1.463.737 1.463 1.814V20h3.328v-8.16c0-2.73-1.457-4.003-3.333-4.003-1.23 0-1.839.692-2.19 1.178v.002zm14.03.468h-3.298V20h3.328v-5.372c0-1.322.25-2.632 1.972-2.632 1.703 0 1.72 1.531 1.72 2.707V20H24v-6.331c0-3.076-1.634-4.507-3.806-4.507-1.56 0-2.25.778-2.626 1.326h.002v-1.12z"/></svg>
    ),
    color: "bg-blue-700 hover:bg-blue-800 text-white",
  },
  {
    label: "Share on Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=https://journoscoop.lovable.app`,
    icon: (
      <svg aria-hidden="true" width={15} height={15} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.327C.596 0 0 .594 0 1.326V22.67c0 .73.595 1.324 1.326 1.324H12.82v-9.293H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.594 1.325-1.324V1.326C24 .594 23.404 0 22.675 0"/></svg>
    ),
    color: "bg-blue-900 hover:bg-blue-950 text-white",
  },
];

export const SocialSharePanel = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(SHARE_TEXT);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className="w-full max-w-xs mx-auto shadow border-0 bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm p-0">
      <CardHeader className="py-2 px-3">
        <CardTitle className="flex flex-col items-center text-sm font-semibold text-gray-800 dark:text-gray-100 gap-1">
          <UserPlus2 className="h-4 w-4 text-indigo-500 mb-0" />
          <span className="text-sm tracking-tight font-bold leading-tight text-center">
            Help Us Grow JournoScoop!
          </span>
        </CardTitle>
        <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1 mb-0 text-center font-medium">
          <b>Share</b> this free tool with your network.<br />
          <span className="text-[10px] text-blue-700 dark:text-blue-300 font-normal">(Early supporters leaderboard soon! 🚀)</span>
        </p>
      </CardHeader>
      <CardContent className="p-0 pt-1 pb-3 flex flex-col items-center">
        <div className="flex flex-wrap gap-1 justify-center w-full items-center px-1">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1"
              aria-label={item.label}
            >
              <Button
                variant="default"
                className={`w-full min-w-[88px] h-7 justify-center ${item.color} font-semibold gap-1 shadow hover:scale-105 transition text-xs py-0`}
                style={{ fontSize: "0.85rem" }}
              >
                {item.icon}
                {item.label}
              </Button>
            </a>
          ))}
          <Button
            variant="outline"
            className="w-full sm:w-auto font-semibold gap-1 text-xs h-7 py-0 min-w-[88px] justify-center"
            onClick={handleCopy}
            aria-label="Copy sample share text"
            style={{ fontSize: "0.85rem" }}
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy Text"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
