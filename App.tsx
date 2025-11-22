
import React, { useState, useEffect } from 'react';
import { translateWord } from './services/geminiService';
import { DictionaryEntry, ViewState, ThemeName } from './types';
import { THEMES } from './utils/theme';
import WordCard from './components/WordCard';
import QuizMode from './components/QuizMode';
import { SearchIcon, BookIcon, HeartIcon, BrainIcon, MicIcon, SettingsIcon, PaletteIcon, InfoIcon, ChevronLeftIcon } from './components/Icons';

function App() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [currentEntry, setCurrentEntry] = useState<DictionaryEntry | null>(null);
  const [favorites, setFavorites] = useState<DictionaryEntry[]>([]);
  const [history, setHistory] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'am-ET'>('en-US');
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('emerald');

  const theme = THEMES[currentTheme].colors;

  // Load data from local storage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('abyssinia_favs');
      const savedHist = localStorage.getItem('abyssinia_hist');
      const savedTheme = localStorage.getItem('abyssinia_theme');
      
      if (savedFavs) {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
      
      if (savedHist) {
        const parsed = JSON.parse(savedHist);
        if (Array.isArray(parsed)) setHistory(parsed);
      }

      if (savedTheme && THEMES[savedTheme as ThemeName]) {
        setCurrentTheme(savedTheme as ThemeName);
      }
    } catch (e) {
      console.error("Failed to load local storage data", e);
      setFavorites([]);
      setHistory([]);
    }
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem('abyssinia_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('abyssinia_hist', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('abyssinia_theme', currentTheme);
  }, [currentTheme]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentEntry(null);
    setView(ViewState.SEARCH);

    try {
      // 1. Check History Cache
      const historyResult = history.find(
        h => h.word.toLowerCase() === query.toLowerCase() || 
        h.translation.toLowerCase() === query.toLowerCase()
      );
      
      if (historyResult) {
        setCurrentEntry(historyResult);
        addToHistory(historyResult);
        setLoading(false);
        return;
      }

      // 2. Use Offline Dictionary Service
      const result = await translateWord(query);
      if (result) {
        setCurrentEntry(result);
        addToHistory(result);
      } else {
        setError("Word not found in dictionary.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (entry: DictionaryEntry) => {
    setHistory(prev => {
      // Prevent duplicates and nulls
      if (!entry || !entry.id) return prev;
      const filtered = prev.filter(item => item.id !== entry.id);
      return [entry, ...filtered].slice(0, 50); // Keep last 50
    });
  };

  const toggleFavorite = (entry: DictionaryEntry) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === entry.id);
      if (exists) {
        return prev.filter(f => f.id !== entry.id);
      }
      return [entry, ...prev];
    });
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = voiceLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      setTimeout(() => {
         const form = document.getElementById('search-form') as HTMLFormElement;
         if(form) form.requestSubmit();
      }, 500);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const renderContent = () => {
    if (view === ViewState.SEARCH) {
      if (loading) {
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-32"></div>
            <p className="mt-8 text-slate-400 text-sm">Searching dictionary...</p>
          </div>
        );
      }
      if (error) {
        return (
          <div className="text-center py-20">
             <div className="inline-block p-4 bg-red-50 rounded-full text-red-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
             </div>
             <p className="text-slate-600 font-medium">{error}</p>
             <p className="text-slate-400 text-sm mt-2">Try "Hello", "Love", or "Coffee"</p>
             <button onClick={() => setView(ViewState.HOME)} className={`mt-4 hover:underline ${theme.primary}`}>Go Home</button>
          </div>
        );
      }
      if (currentEntry) {
        return (
          <div className="max-w-2xl mx-auto">
            <WordCard 
              entry={currentEntry} 
              isFavorite={favorites.some(f => f.id === currentEntry.id)}
              onToggleFavorite={toggleFavorite}
              theme={theme}
            />
          </div>
        );
      }
    }

    if (view === ViewState.FAVORITES) {
      return (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <HeartIcon className="w-6 h-6 mr-2 text-red-500" fill={true} />
            My Collection ({favorites.length})
          </h2>
          {favorites.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
              <p className="text-slate-500">No favorite words yet. Search and tap the heart icon!</p>
            </div>
          ) : (
            favorites.map(entry => (
              <WordCard 
                key={entry.id} 
                entry={entry} 
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                theme={theme}
              />
            ))
          )}
        </div>
      );
    }

    if (view === ViewState.QUIZ) {
      return (
        <div className="py-6">
           <h2 className="text-2xl font-bold text-center text-slate-800 mb-8 flex items-center justify-center">
            <BrainIcon className={`w-6 h-6 mr-2 ${theme.primary}`} />
            Flashcard Quiz
          </h2>
          <QuizMode items={favorites.length > 0 ? favorites : history} theme={theme} />
          {favorites.length === 0 && history.length === 0 && (
             <p className="text-center text-slate-400 mt-4 text-sm">Start searching to build a quiz deck.</p>
          )}
        </div>
      );
    }

    if (view === ViewState.SETTINGS) {
      return (
        <div className="max-w-md mx-auto py-6">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8 flex items-center justify-center">
            <SettingsIcon className={`w-6 h-6 mr-2 ${theme.primary}`} />
            Settings
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">Color Theme</h3>
            <div className="grid grid-cols-1 gap-4">
              {(Object.keys(THEMES) as ThemeName[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setCurrentTheme(t)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${currentTheme === t ? `border-${t}-500 bg-slate-50` : 'border-transparent hover:bg-slate-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${THEMES[t].colors.bg} mr-4 shadow-sm`}></div>
                    <span className="font-medium text-slate-700">{THEMES[t].name}</span>
                  </div>
                  {currentTheme === t && (
                    <div className={`w-2 h-2 rounded-full ${THEMES[t].colors.bg}`}></div>
                  )}
                </button>
              ))}
            </div>
          </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">Data</h3>
            <div className="space-y-2">
               <div className="flex justify-between items-center p-2">
                  <span className="text-slate-600">Search History</span>
                  <button onClick={() => setHistory([])} className="text-xs text-red-500 hover:underline">Clear History</button>
               </div>
               <div className="flex justify-between items-center p-2 border-t border-slate-100">
                  <span className="text-slate-600">Favorites</span>
                  <button onClick={() => setFavorites([])} className="text-xs text-red-500 hover:underline">Clear All</button>
               </div>
            </div>
          </div>

          <button 
            onClick={() => setView(ViewState.ABOUT)}
            className="w-full flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <InfoIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">About Abyssinia</span>
          </button>
        </div>
      );
    }

    if (view === ViewState.ABOUT) {
      return (
        <div className="max-w-lg mx-auto py-6">
           <button 
             onClick={() => setView(ViewState.SETTINGS)}
             className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
           >
             <ChevronLeftIcon className="w-5 h-5 mr-1" />
             <span className="font-medium">Back to Settings</span>
           </button>

           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className={`${theme.bgSoft} p-10 flex flex-col items-center text-center`}>
               <div className={`p-4 bg-white rounded-2xl shadow-sm mb-4`}>
                  <BookIcon className={`w-12 h-12 ${theme.primary}`} />
               </div>
               <h1 className="text-3xl font-bold text-slate-900 mb-2">Abyssinia</h1>
               <p className={`font-medium ${theme.secondary}`}>Version 1.0.0</p>
             </div>
             
             <div className="p-8 space-y-6">
               <section>
                 <h3 className="text-sm font-bold uppercase text-slate-400 mb-2 tracking-wider">Mission</h3>
                 <p className="text-slate-600 leading-relaxed">
                   Abyssinia is a modern, offline-first dictionary designed to bridge languages and connect cultures. We aim to make Amharic accessible to everyone through intuitive design, phonetic search, and voice integration.
                 </p>
               </section>

               <section>
                 <h3 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">Key Features</h3>
                 <ul className="space-y-3 text-slate-700">
                   <li className="flex items-start">
                     <span className={`mr-3 mt-1 p-1 rounded-full ${theme.bgSoft}`}>
                       <SearchIcon className={`w-3 h-3 ${theme.primary}`} />
                     </span>
                     <span><strong>Offline Access:</strong> No internet required.</span>
                   </li>
                   <li className="flex items-start">
                     <span className={`mr-3 mt-1 p-1 rounded-full ${theme.bgSoft}`}>
                       <MicIcon className={`w-3 h-3 ${theme.primary}`} />
                     </span>
                     <span><strong>Voice Input:</strong> Speak in English or Amharic.</span>
                   </li>
                   <li className="flex items-start">
                     <span className={`mr-3 mt-1 p-1 rounded-full ${theme.bgSoft}`}>
                       <BrainIcon className={`w-3 h-3 ${theme.primary}`} />
                     </span>
                     <span><strong>Phonetic Search:</strong> Type "Selam" to find "ሰላም".</span>
                   </li>
                   <li className="flex items-start">
                     <span className={`mr-3 mt-1 p-1 rounded-full ${theme.bgSoft}`}>
                       <PaletteIcon className={`w-3 h-3 ${theme.primary}`} />
                     </span>
                     <span><strong>Themes:</strong> Customize your experience.</span>
                   </li>
                 </ul>
               </section>

               <div className="pt-6 border-t border-slate-100 text-center">
                 <p className="text-xs text-slate-400">
                   Made with <HeartIcon className="w-3 h-3 inline text-red-500 mx-0.5" fill={true} /> for Ethiopia
                 </p>
                 <p className="text-xs text-slate-300 mt-1">© 2025 Abyssinia Team</p>
               </div>
             </div>
           </div>
        </div>
      );
    }

    // Default: HOME view
    return (
      <div className="flex flex-col items-center justify-center py-10 lg:py-20">
        <div className="mb-8 text-center space-y-4">
           <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-4 ${theme.bgSoft}`}>
              <BookIcon className={`w-8 h-8 ${theme.secondary}`} />
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Abyssinia</h1>
           <p className="text-slate-500 text-lg max-w-md mx-auto">
             Offline Amharic-English Dictionary. Translate words instantly.
           </p>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mb-8">
           {["Hello", "Coffee", "Love", "House", "Thank you", "Ethiopia"].map(word => (
             <button 
               key={word}
               onClick={() => { setQuery(word); handleSearch(); }}
               className={`px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-current transition-colors ${theme.hoverBorder} ${theme.hoverText}`}
             >
               {word}
             </button>
           ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <form id="search-form" onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className={`h-5 w-5 text-slate-400 group-focus-within:${theme.primary.replace('text-', '')} transition-colors`} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`block w-full pl-10 pr-28 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:bg-white transition-all shadow-inner focus:shadow-none ${theme.ring}`}
              placeholder={voiceLang === 'am-ET' ? "ቃላትን ይፈልጉ..." : "Search words..."}
            />
            
            {/* Voice Language Toggle */}
            <div className="absolute inset-y-0 right-12 flex items-center">
              <button
                type="button"
                onClick={() => setVoiceLang(prev => prev === 'en-US' ? 'am-ET' : 'en-US')}
                className={`px-2 py-1 rounded text-xs font-bold transition-colors uppercase border ${
                  voiceLang === 'am-ET' 
                    ? `${theme.bgSoft} ${theme.secondary} ${theme.border} font-amharic` 
                    : 'bg-slate-200 text-slate-600 border-transparent'
                }`}
                title="Switch Voice Input Language"
              >
                {voiceLang === 'en-US' ? 'EN' : 'አማ'}
              </button>
            </div>

            <button
              type="button"
              onClick={startListening}
              className={`absolute inset-y-0 right-2 flex items-center p-2 rounded-lg transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-slate-600'}`}
              title="Voice Search"
            >
              <MicIcon className="w-5 h-5" active={isListening} />
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden z-10">
        <div className="flex justify-around items-center h-16">
          <button onClick={() => { setView(ViewState.HOME); setQuery(''); }} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === ViewState.HOME ? theme.activeNav : 'text-slate-400'}`}>
            <BookIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button onClick={() => setView(ViewState.FAVORITES)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === ViewState.FAVORITES ? theme.activeNav : 'text-slate-400'}`}>
            <HeartIcon className="w-6 h-6" fill={view === ViewState.FAVORITES} />
            <span className="text-xs font-medium">Saved</span>
          </button>
           <button onClick={() => setView(ViewState.QUIZ)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === ViewState.QUIZ ? theme.activeNav : 'text-slate-400'}`}>
            <BrainIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Quiz</span>
          </button>
          <button onClick={() => setView(ViewState.SETTINGS)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${view === ViewState.SETTINGS ? theme.activeNav : 'text-slate-400'}`}>
            <SettingsIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
      
       {/* Desktop Quick Nav */}
       <div className="hidden md:flex fixed bottom-8 right-8 gap-4">
          <button onClick={() => setView(ViewState.FAVORITES)} className={`bg-white p-4 rounded-full shadow-lg text-slate-600 ${theme.hoverText} transition-transform hover:scale-105 border border-slate-100`} title="Favorites">
             <HeartIcon className="w-6 h-6" fill={view === ViewState.FAVORITES} />
          </button>
          <button onClick={() => setView(ViewState.QUIZ)} className={`bg-white p-4 rounded-full shadow-lg text-slate-600 ${theme.hoverText} transition-transform hover:scale-105 border border-slate-100`} title="Quiz Mode">
             <BrainIcon className="w-6 h-6" />
          </button>
          <button onClick={() => setView(ViewState.SETTINGS)} className={`bg-white p-4 rounded-full shadow-lg text-slate-600 ${theme.hoverText} transition-transform hover:scale-105 border border-slate-100`} title="Settings">
             <SettingsIcon className="w-6 h-6" />
          </button>
       </div>
    </div>
  );
}

export default App;
