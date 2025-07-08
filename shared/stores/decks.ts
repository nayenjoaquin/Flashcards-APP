import { Deck } from "types";
import { create } from "zustand";

interface storeProps{
  savedDecks: Deck[];
  setSavedDecks: (decks: Deck[])=>void;
}

export const decksStore = create<storeProps>(set=>({
  savedDecks: [],
  setSavedDecks: (decks)=>set({savedDecks: decks}),
  }));