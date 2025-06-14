
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="relative flex flex-col items-center justify-center pt-6 pb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <Logo />

      <p className="text-base sm:text-lg text-center text-gray-600 dark:text-gray-300 mt-2 mb-3 font-medium">
        Your Daily Hit of Hot PR Leads 🔎
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-center">
        Discover real-time journalist, podcast, and content requests on Twitter using hashtags and keyword-based searches
      </p>
    </header>
  );
};
