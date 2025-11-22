import { DictionaryEntry } from "../types";
import { searchOffline } from "../utils/offlineData";

export const translateWord = async (text: string): Promise<DictionaryEntry | null> => {
  // Simulate a very brief async operation for UI consistency
  await new Promise(resolve => setTimeout(resolve, 300));
  return searchOffline(text);
};
