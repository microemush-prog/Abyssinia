import React from 'react';
import { DictionaryEntry } from '../types';
import { HeartIcon, SpeakerIcon } from './Icons';
import { ThemeColors } from '../utils/theme';

interface WordCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  onToggleFavorite: (entry: DictionaryEntry) => void;
  theme: ThemeColors;
}

const WordCard: React.FC<WordCardProps> = ({ entry, isFavorite, onToggleFavorite, theme }) => {
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to match language for better accent
      utterance.lang = entry.sourceLang === 'en' ? 'en-US' : 'am-ET'; // am-ET might not be supported everywhere
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4 transition-all hover:shadow-md">
      <div className="p-5 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h2 className={`text-3xl font-bold text-slate-900 ${entry.sourceLang === 'am' ? 'font-amharic' : ''}`}>
            {entry.word}
          </h2>
          <div className="flex items-center mt-2 space-x-2 text-slate-500">
            <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {entry.phonetic}
            </span>
            <button 
              onClick={() => playAudio(entry.word)}
              className={`p-1.5 hover:bg-slate-100 rounded-full transition-colors ${theme.primary}`}
              title="Listen"
            >
              <SpeakerIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button 
          onClick={() => onToggleFavorite(entry)}
          className={`p-2 rounded-full transition-all ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'}`}
        >
          <HeartIcon className="w-6 h-6" fill={isFavorite} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Translation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Translation</h3>
          <p className={`text-xl font-medium ${theme.secondary} ${entry.targetLang === 'am' ? 'font-amharic' : ''}`}>
            {entry.translation}
          </p>
        </div>

        {/* Definitions */}
        {entry.definitions?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Definitions</h3>
            <ul className="space-y-2">
              {entry.definitions.map((def, idx) => (
                <li key={idx} className="flex gap-2 text-slate-700">
                  <span className="italic text-slate-500 text-sm mt-0.5">{def.partOfSpeech}</span>
                  <span>{def.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        {entry.examples?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Examples</h3>
            <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {entry.examples.map((ex, idx) => (
                <div key={idx} className="text-sm">
                  <p className={`font-medium text-slate-800 ${entry.sourceLang === 'am' ? 'font-amharic' : ''}`}>{ex.original}</p>
                  <p className={`text-slate-500 ${entry.targetLang === 'am' ? 'font-amharic' : ''}`}>{ex.translation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Synonyms */}
        {entry.synonyms?.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 mr-2">SYNONYMS:</span>
            <div className="inline-flex flex-wrap gap-1">
              {entry.synonyms.map((syn, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                  {syn}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCard;