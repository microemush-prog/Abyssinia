import React, { useState, useEffect } from 'react';
import { DictionaryEntry } from '../types';
import { ThemeColors } from '../utils/theme';

interface QuizModeProps {
  items: DictionaryEntry[];
  theme: ThemeColors;
}

const QuizMode: React.FC<QuizModeProps> = ({ items, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<DictionaryEntry[]>([]);

  useEffect(() => {
    // Simple shuffle
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No Words for Quiz</h3>
        <p className="text-slate-500">Star some words in the dictionary to build your flashcard deck!</p>
      </div>
    );
  }

  const currentItem = shuffledItems[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledItems.length);
    }, 200);
  };

  const progress = ((currentIndex + 1) / shuffledItems.length) * 100;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
        <span>Card {currentIndex + 1} of {shuffledItems.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div className={`h-full transition-all duration-300 ${theme.bg}`} style={{ width: `${progress}%` }}></div>
      </div>

      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-80 w-full perspective-1000 cursor-pointer group"
      >
        <div className={`relative w-full h-full text-center transition-all duration-500 transform-style-3d shadow-lg rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Translate this</span>
            <h2 className={`text-4xl font-bold text-slate-800 ${currentItem?.sourceLang === 'am' ? 'font-amharic' : ''}`}>
              {currentItem?.word}
            </h2>
            <p className="mt-4 text-slate-400 text-sm">Tap to reveal</p>
          </div>

          {/* Back */}
          <div className={`absolute w-full h-full backface-hidden text-white rounded-2xl flex flex-col items-center justify-center p-8 rotate-y-180 ${theme.bg}`}>
            <span className="text-xs font-bold tracking-widest opacity-80 uppercase mb-4">Answer</span>
            <h2 className={`text-4xl font-bold ${currentItem?.targetLang === 'am' ? 'font-amharic' : ''}`}>
              {currentItem?.translation}
            </h2>
            <p className="mt-2 opacity-80 italic">{currentItem?.phonetic}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={handleNext}
          className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all active:scale-95"
        >
          Next Card
        </button>
      </div>
    </div>
  );
};

export default QuizMode;