import { DictionaryEntry } from "../types";

export const OFFLINE_DICTIONARY: DictionaryEntry[] = [
  {
    id: "static-1",
    word: "Hello",
    translation: "ሰላም (Selam)",
    phonetic: "/səˈlam/",
    definitions: [{ meaning: "A greeting used to begin a conversation.", partOfSpeech: "interjection" }],
    examples: [{ original: "Hello, how are you?", translation: "ሰላም፣ እንደምን አለህ?" }],
    synonyms: ["Hi", "Greetings"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-2",
    word: "Love",
    translation: "ፍቅር (Fik'ir)",
    phonetic: "/fɨkʼɨr/",
    definitions: [{ meaning: "An intense feeling of deep affection.", partOfSpeech: "noun" }],
    examples: [{ original: "Love is patient.", translation: "ፍቅር ታጋሽ ነው።" }],
    synonyms: ["Affection", "Adoration"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-3",
    word: "ቡና",
    translation: "Coffee",
    phonetic: "Buna",
    definitions: [{ meaning: "A hot drink made from the roasted and ground seeds of a tropical shrub.", partOfSpeech: "noun" }],
    examples: [{ original: "ቡና እወዳለሁ።", translation: "I like coffee." }],
    synonyms: [],
    sourceLang: "am",
    targetLang: "en",
    timestamp: Date.now()
  },
  {
    id: "static-4",
    word: "House",
    translation: "ቤት (Bet)",
    phonetic: "/bet/",
    definitions: [{ meaning: "A building for human habitation.", partOfSpeech: "noun" }],
    examples: [{ original: "Go to the house.", translation: "ወደ ቤት ሂድ።" }],
    synonyms: ["Home", "Dwelling"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-5",
    word: "Thank you",
    translation: "አመሰግናለሁ (Ameseginalehu)",
    phonetic: "/a.mə.sə.ɡɨ.na.lə.hu/",
    definitions: [{ meaning: "A polite expression used when acknowledging a gift, service, or compliment.", partOfSpeech: "phrase" }],
    examples: [{ original: "Thank you for your help.", translation: "ስለ እርዳታህ አመሰግናለሁ።" }],
    synonyms: ["Thanks"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-6",
    word: "Water",
    translation: "ውሃ (Wuha)",
    phonetic: "/wu.ha/",
    definitions: [{ meaning: "A colorless, transparent, odorless liquid.", partOfSpeech: "noun" }],
    examples: [{ original: "Drink water.", translation: "ውሃ ጠጣ።" }],
    synonyms: [],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-7",
    word: "Good",
    translation: "ጥሩ (Tiru)",
    phonetic: "/tʼi.ru/",
    definitions: [{ meaning: "To be desired or approved of.", partOfSpeech: "adjective" }],
    examples: [{ original: "Have a good day.", translation: "ጥሩ ቀን ይሁንልህ።" }],
    synonyms: ["Nice", "Fine"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-8",
    word: "Yes",
    translation: "አዎ (Awo)",
    phonetic: "/a.wo/",
    definitions: [{ meaning: "Used to give an affirmative response.", partOfSpeech: "adverb" }],
    examples: [{ original: "Yes, I am coming.", translation: "አዎ፣ እየመጣሁ ነው።" }],
    synonyms: [],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-9",
    word: "No",
    translation: "አይ (Aye)",
    phonetic: "/a.je/",
    definitions: [{ meaning: "Used to give a negative response.", partOfSpeech: "adverb" }],
    examples: [{ original: "No, thank you.", translation: "አይ፣ አመሰግናለሁ።" }],
    synonyms: [],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-10",
    word: "Ethiopia",
    translation: "ኢትዮጵያ (Ityop'iya)",
    phonetic: "/i.tjo.pʼi.ja/",
    definitions: [{ meaning: "A country in the Horn of Africa.", partOfSpeech: "noun" }],
    examples: [{ original: "I love Ethiopia.", translation: "ኢትዮጵያን እወዳለሁ።" }],
    synonyms: [],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-11",
    word: "Food",
    translation: "ምግብ (Migib)",
    phonetic: "/mɨ.ɡɨb/",
    definitions: [{ meaning: "Any nutritious substance that people or animals eat.", partOfSpeech: "noun" }],
    examples: [{ original: "The food is delicious.", translation: "ምግቡ በጣም ይጠፍጣል።" }],
    synonyms: ["Meal", "Nourishment"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  },
  {
    id: "static-12",
    word: "Friend",
    translation: "ጓደኛ (Guadegna)",
    phonetic: "/ɡwa.də.ɲa/",
    definitions: [{ meaning: "A person whom one knows and with whom one has a bond of mutual affection.", partOfSpeech: "noun" }],
    examples: [{ original: "He is my best friend.", translation: "እሱ የቅርብ ጓደኛዬ ነው።" }],
    synonyms: ["Pal", "Mate"],
    sourceLang: "en",
    targetLang: "am",
    timestamp: Date.now()
  }
];

// 1. EXACT WORD MAP
// Covers common misspellings and variations for specific words in our dictionary.
const WORD_MAP: Record<string, string> = {
  "selam": "ሰላም", "salam": "ሰላም", "hallo": "ሰላም",
  "fikir": "ፍቅር", "fikr": "ፍቅር", "feqer": "ፍቅር", "love": "ፍቅር",
  "buna": "ቡና", "coffee": "ቡና", "boona": "ቡና",
  "bet": "ቤት", "beit": "ቤት", "house": "ቤት",
  "ameseginalehu": "አመሰግናለሁ", "ameseginalew": "አመሰግናለሁ", "thank you": "አመሰግናለሁ", "thanks": "አመሰግናለሁ",
  "wuha": "ውሃ", "water": "ውሃ", "woha": "ውሃ",
  "tiru": "ጥሩ", "teru": "ጥሩ", "good": "ጥሩ",
  "awo": "አዎ", "aw": "አዎ", "yes": "አዎ", "ao": "አዎ",
  "aye": "አይ", "ay": "አይ", "no": "አይ",
  "ethiopia": "ኢትዮጵያ", "ityopiya": "ኢትዮጵያ", "ethiopa": "ኢትዮጵያ",
  "migib": "ምግብ", "megeb": "ምግብ", "food": "ምግብ", "migb": "ምግብ",
  "guadegna": "ጓደኛ", "gwadegna": "ጓደኛ", "friend": "ጓደኛ", "gwadenya": "ጓደኛ"
};

// 2. SYLLABLE MAPPING (Greedy Match Helpers)
// Maps Latin character sequences to Amharic Fidel.
const AMHARIC_SYLLABLES: Record<string, string> = {
  // Vowels
  "a": "አ", "u": "ኡ", "i": "ኢ", "e": "እ", "o": "ኦ",
  
  // Ha
  "ha": "ሀ", "hu": "ሁ", "hi": "ሂ", "he": "ሄ", "ho": "ሆ", "h": "ህ",
  
  // Le
  "la": "ላ", "lu": "ሉ", "li": "ሊ", "le": "ለ", "lo": "ሎ", "l": "ል",
  
  // Me
  "ma": "ማ", "mu": "ሙ", "mi": "ሚ", "me": "መ", "mo": "ሞ", "m": "ም",
  
  // Se
  "sa": "ሳ", "su": "ሱ", "si": "ሲ", "se": "ሰ", "so": "ሶ", "s": "ስ",
  
  // Re
  "ra": "ራ", "ru": "ሩ", "ri": "ሪ", "re": "ረ", "ro": "ሮ", "r": "ር",
  
  // Be
  "ba": "ባ", "bu": "ቡ", "bi": "ቢ", "be": "በ", "bo": "ቦ", "b": "ብ",
  
  // Te
  "ta": "ታ", "tu": "ቱ", "ti": "ቲ", "te": "ተ", "to": "ቶ", "t": "ት",
  
  // Che
  "cha": "ቻ", "chu": "ቹ", "chi": "ቺ", "che": "ቸ", "cho": "ቾ", "ch": "ች",
  
  // Ne
  "na": "ና", "nu": "ኑ", "ni": "ኒ", "ne": "ነ", "no": "ኖ", "n": "ን",
  
  // Gnye/Nye
  "nya": "ኛ", "nyu": "ኙ", "nyi": "ኚ", "nye": "ኘ", "nyo": "ኞ", "ny": "ኝ",
  "gna": "ኛ", "gnu": "ኙ", "gni": "ኚ", "gne": "ኘ", "gno": "ኞ", "gn": "ኝ",
  
  // Ke
  "ka": "ካ", "ku": "ኩ", "ki": "ኪ", "ke": "ከ", "ko": "ኮ", "k": "ክ",
  
  // We
  "wa": "ዋ", "wu": "ው", "wi": "ዊ", "we": "ወ", "wo": "ዎ", "w": "ው",
  
  // Ze
  "za": "ዛ", "zu": "ዙ", "zi": "ዚ", "ze": "ዘ", "zo": "ዞ", "z": "ዝ",
  
  // Ye
  "ya": "ያ", "yu": "ዩ", "yi": "ዪ", "ye": "የ", "yo": "ዮ", "y": "ይ",
  
  // De
  "da": "ዳ", "du": "ዱ", "di": "ዲ", "de": "ደ", "do": "ዶ", "d": "ድ",
  
  // Je
  "ja": "ጃ", "ju": "ጁ", "ji": "ጂ", "je": "ጀ", "jo": "ጆ", "j": "ጅ",
  
  // Ge
  "ga": "ጋ", "gu": "ጉ", "gi": "ጊ", "ge": "ገ", "go": "ጎ", "g": "ግ",
  
  // T'e (Explosive T)
  "t'a": "ጣ", "t'u": "ጡ", "t'i": "ጢ", "t'e": "ጠ", "t'o": "ጦ", 
  
  // Ch'e
  "ch'a": "ጫ", "ch'u": "ጩ", "ch'i": "ጪ", "ch'e": "ጨ", "ch'o": "ጮ",
  
  // P'e
  "p'a": "ጳ", "p'u": "ጱ", "p'i": "ጲ", "p'e": "ጰ", "p'o": "ጶ",
  
  // Ts'e
  "ts'a": "ጻ", "ts'u": "ጹ", "ts'i": "ጺ", "ts'e": "ጸ", "ts'o": "ጾ", "ts": "ጽ",
  
  // Fe
  "fa": "ፋ", "fu": "ፉ", "fi": "ፊ", "fe": "ፈ", "fo": "ፎ", "f": "ፍ",
  
  // Pe
  "pa": "ፓ", "pu": "ፑ", "pi": "ፒ", "pe": "ፐ", "po": "ፖ", "p": "ፕ",
  
  // Labiovelars (simplified common ones)
  "kwa": "ኳ", "gwa": "ጓ", "qwa": "ቋ", "hwa": "ኋ"
};

const transliterateToAmharic = (text: string): string | null => {
  const lower = text.toLowerCase().trim();
  
  // 1. Fast Check: Exact Word Map
  if (WORD_MAP[lower]) {
    return WORD_MAP[lower];
  }

  // 2. Algorithmic Greedy Transliteration
  // We look for the longest matching syllable at the current position.
  // e.g. "gwa" (3 chars) priority over "gw" (2) or "g" (1).
  let result = "";
  let i = 0;
  
  // Normalization for common Latin typing variations
  const normalized = lower
    .replace(/ee/g, "i") // 'bet' vs 'beet' -> sometimes maps better
    .replace(/oo/g, "u") // 'boona' -> 'buna'
    .replace(/aa/g, "a");

  while (i < normalized.length) {
    let found = false;
    
    // Try matching 4 characters down to 1 character
    for (let len = 4; len >= 1; len--) {
      if (i + len > normalized.length) continue;
      
      const sub = normalized.substring(i, i + len);
      if (AMHARIC_SYLLABLES[sub]) {
        result += AMHARIC_SYLLABLES[sub];
        i += len;
        found = true;
        break;
      }
    }
    
    // If no match found (punctuation or unknown char), keep original
    if (!found) {
      result += normalized[i];
      i++;
    }
  }
  
  return result.length > 0 ? result : null;
};

export const searchOffline = (text: string): DictionaryEntry | null => {
  if (!text) return null;
  const query = text.trim().toLowerCase();
  
  // 1. Exact match word (English or Amharic)
  let match = OFFLINE_DICTIONARY.find(entry => entry.word.toLowerCase() === query);
  if (match) return match;

  // 2. Check explicit word map (misspellings -> Amharic -> search)
  if (WORD_MAP[query]) {
    const mappedAmharic = WORD_MAP[query];
    match = OFFLINE_DICTIONARY.find(entry => 
      entry.word === mappedAmharic || 
      entry.translation.includes(mappedAmharic)
    );
    if (match) return match;
  }

  // 3. Match translation (simple includes check)
  match = OFFLINE_DICTIONARY.find(entry => entry.translation.toLowerCase().includes(query));
  if (match) return match;

  // 4. Match definition keywords, phonetic field, or synonyms
  match = OFFLINE_DICTIONARY.find(entry => 
    entry.phonetic.toLowerCase().includes(query) ||
    (entry.synonyms && entry.synonyms.some(s => s.toLowerCase() === query))
  );
  if (match) return match;

  // 5. Phonetic Transliteration Search (Latin -> Amharic)
  // If user types "selam" and it wasn't caught above, we algorithmically convert to "ሰላም".
  const amharicTerm = transliterateToAmharic(query);
  if (amharicTerm) {
    match = OFFLINE_DICTIONARY.find(entry => 
      entry.word.includes(amharicTerm) || 
      entry.translation.includes(amharicTerm)
    );
    if (match) return match;
  }
  
  return null;
};