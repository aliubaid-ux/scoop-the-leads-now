import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Lock, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchLimitBannerProps {
  searchCount: number;
  remainingSearches: number;
  isLimitReached: boolean;
  freeSearchLimit: number;
}

export const SearchLimitBanner = ({ 
  searchCount, 
  remainingSearches, 
  isLimitReached,
  freeSearchLimit 
}: SearchLimitBannerProps) => {
  const navigate = useNavigate();

  if (isLimitReached) {
    return (
      <Alert className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <Lock className="h-4 w-4 text-amber-600" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              Free search limit reached! ({freeSearchLimit} searches used)
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
              Sign up for unlimited searches, save favorites, and get email alerts.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Star className="h-4 w-4 mr-2" />
            Sign Up Free
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (searchCount > 0) {
    return (
      <Alert className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <Zap className="h-4 w-4 text-blue-600" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              {remainingSearches} free searches remaining
            </p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Sign up for unlimited searches and advanced features.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/auth')}
            className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300"
          >
            Sign Up Free
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};