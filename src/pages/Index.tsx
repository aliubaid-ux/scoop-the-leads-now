
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HashtagSelector } from '../components/HashtagSelector';
import { SearchBuilder } from '../components/SearchBuilder';
import { SearchPresets } from '../components/SearchPresets';
import { PitchTemplates } from '../components/PitchTemplates';
import { NaturalLanguageSelector } from '../components/NaturalLanguageSelector';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Hashtag & Phrase Selection */}
          <div className="lg:col-span-2 space-y-6">
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
          </div>
          {/* Right Column - Presets & Templates */}
          <div className="space-y-6">
            <SearchPresets 
              selectedHashtags={selectedHashtags}
              selectedPhrases={selectedPhrases}
              setSelectedHashtags={setSelectedHashtags}
              setSelectedPhrases={setSelectedPhrases}
              customKeywords={customKeywords}
            />
            <PitchTemplates />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
