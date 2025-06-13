
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <header className="text-center relative">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className="absolute top-0 right-0 p-2"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
        JournoScoop
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Your Daily Hit of Hot PR Leads 🔎
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        Discover real-time journalist, podcast, and content requests on Twitter using hashtags and keyword-based searches
      </p>
    </header>
  );
};
