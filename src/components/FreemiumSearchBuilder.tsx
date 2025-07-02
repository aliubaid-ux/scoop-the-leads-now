import { useState } from 'react';
import { SearchBuilder } from './SearchBuilder';
import { SearchLimitBanner } from './SearchLimitBanner';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Zap, Save, History, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FreemiumSearchBuilderProps {
  selectedHashtags: string[];
  selectedPhrases: string[];
  customKeywords: string;
  setCustomKeywords: (keywords: string) => void;
}

export const FreemiumSearchBuilder = (props: FreemiumSearchBuilderProps) => {
  const { 
    searchCount, 
    isLimitReached, 
    remainingSearches, 
    trackSearch, 
    isAuthenticated,
    freeSearchLimit 
  } = useUsageTracking();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSearchAttempt = async () => {
    if (isLimitReached) {
      setShowUpgradeModal(true);
      return false;
    }

    const success = await trackSearch();
    if (!success && !isAuthenticated) {
      setShowUpgradeModal(true);
      toast({
        title: "Search limit reached",
        description: "Sign up for unlimited searches and advanced features!",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <SearchLimitBanner 
        searchCount={searchCount}
        remainingSearches={remainingSearches}
        isLimitReached={isLimitReached}
        freeSearchLimit={freeSearchLimit}
      />
      
      <SearchBuilder 
        {...props}
        onSearchAttempt={handleSearchAttempt}
      />

      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Unlock Full Access
            </DialogTitle>
            <DialogDescription>
              You've used all {freeSearchLimit} free searches. Sign up to get unlimited access plus these premium features:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 my-4">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Unlimited search generation</span>
            </div>
            <div className="flex items-center gap-3">
              <Save className="h-4 w-4 text-green-500" />
              <span className="text-sm">Save favorite search combinations</span>
            </div>
            <div className="flex items-center gap-3">
              <History className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Search history tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Email alerts for new opportunities</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowUpgradeModal(false)}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button 
              onClick={() => {
                navigate('/auth');
                setShowUpgradeModal(false);
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Star className="h-4 w-4 mr-2" />
              Sign Up Free
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};