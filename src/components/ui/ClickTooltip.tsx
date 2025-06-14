
import * as React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

// Simple tooltip that opens on hover and click (toggle). Closes on outside click or mouse leave.
export function ClickTooltip({
  children,
  content,
  ...contentProps
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  // Tooltip closes on blur, mouseleave, or click outside, opens on hover or click of trigger
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          asChild
          onClick={e => {
            // Prevent click-through on icon buttons
            e.stopPropagation();
            setOpen(v => !v);
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          {...contentProps}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
