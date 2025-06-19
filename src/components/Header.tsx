
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="relative flex flex-col items-center justify-center pt-6 pb-2">
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {!loading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/auth')}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )
        )}
      </div>

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
