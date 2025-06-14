
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HashtagSelector } from '../components/HashtagSelector';
import { SearchBuilder } from '../components/SearchBuilder';
import { NaturalLanguageSelector } from '../components/NaturalLanguageSelector';
import { PopularTwitterAccounts } from '../components/PopularTwitterAccounts';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 w-full">
      <div className="px-0 py-8 w-full max-w-screen-2xl mx-auto">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="flex flex-col gap-8 mt-8 w-full">
          <HashtagSelector 
            selectedHashtags={selectedHashtags}
            setSelectedHashtags={setSelectedHashtags}
          />
          <NaturalLanguageSelector
            selectedPhrases={selectedPhrases}
            setSelectedPhrases={setSelectedPhrases}
          />
          <SearchBuilder 
            selectedHashtags={selectedHashtags}
            selectedPhrases={selectedPhrases}
            customKeywords={customKeywords}
            setCustomKeywords={setCustomKeywords}
          />
          <PopularTwitterAccounts />
        </div>
      </div>
    </div>
  );
};

export default Index;
