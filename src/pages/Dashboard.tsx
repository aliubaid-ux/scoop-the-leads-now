import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SavedSearches } from '../components/SavedSearches';
import { SearchHistory } from '../components/SearchHistory';
import { UsageStats } from '../components/UsageStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, History, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('journoscoop-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('journoscoop-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('journoscoop-theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="mt-8">
          <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                My Dashboard
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your saved searches, view history, and track your usage.
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Saved Searches
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Search History
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Usage Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <SavedSearches />
            </TabsContent>

            <TabsContent value="history">
              <SearchHistory />
            </TabsContent>

            <TabsContent value="stats">
              <UsageStats />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;