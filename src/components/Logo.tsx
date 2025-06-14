
import { Newspaper } from 'lucide-react';

export const Logo = () => (
  <span className="inline-flex items-center gap-2">
    {/* Subtle, modern new logo icon */}
    <Newspaper className="w-8 h-8 text-indigo-500 dark:text-indigo-300 drop-shadow-md" aria-hidden />
    <span className="font-extrabold text-3xl sm:text-4xl tracking-tight bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
      JournoScoop
    </span>
  </span>
);
