
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HashtagSelector } from '../components/HashtagSelector';
import { NaturalLanguageSelector } from '../components/NaturalLanguageSelector';
import { AdvancedJournalistRequest } from '../components/AdvancedJournalistRequest';
import { SocialSharePanel } from "../components/SocialSharePanel";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);
  const [customKeywords, setCustomKeywords] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 w-full flex flex-col min-h-screen">
      <div className="px-0 py-8 w-full max-w-screen-2xl mx-auto flex-1 flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Instead of duplicate heading, just 'Start here' then dropdown */}
        <div className="flex flex-col gap-2 mt-2 w-full items-center">
          <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 text-center mb-2">Start here</h2>
          <div className="w-full max-w-2xl">
            <AdvancedJournalistRequest />
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-8 w-full">
          <HashtagSelector 
            selectedHashtags={selectedHashtags}
            setSelectedHashtags={setSelectedHashtags}
          />
          <NaturalLanguageSelector
            selectedPhrases={selectedPhrases}
            setSelectedPhrases={setSelectedPhrases}
          />
        </div>
      </div>
      {/* Social Sharing Panel at bottom, smaller */}
      <div className="w-full mt-10 pb-5 flex justify-center">
        <SocialSharePanel />
      </div>
    </div>
  );
};

export default Index;

