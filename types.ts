
export interface Definition {
  meaning: string;
  partOfSpeech: string;
}

export interface Example {
  original: string;
  translation: string;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  translation: string;
  phonetic: string;
  definitions: Definition[];
  examples: Example[];
  synonyms: string[];
  sourceLang: 'en' | 'am';
  targetLang: 'en' | 'am';
  timestamp: number;
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  FAVORITES = 'FAVORITES',
  QUIZ = 'QUIZ',
  SETTINGS = 'SETTINGS',
  ABOUT = 'ABOUT'
}

export interface QuizItem {
  question: string;
  answer: string;
  hint?: string;
}

export type ThemeName = 'emerald' | 'rose' | 'amber' | 'blue';
