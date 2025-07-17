import { Deck } from "types";
import { create } from "zustand";

interface storeProps{
  savedDecks: Deck[];
  myDecks: Deck[];
  currentDeck?: Deck|null;
  setCurrentDeck: (deck: Deck) => void;
  setSavedDecks: (decks: Deck[])=>void;
  setMyDecks: (decks: Deck[])=>void;
}

export const decksStore = create<storeProps>(set=>({
  savedDecks: [],
  myDecks: [],
  currentDeck: null,
  setCurrentDeck: (deck: Deck) => set({currentDeck: deck}),
  setSavedDecks: (decks)=>set({savedDecks: decks}),
  setMyDecks: (decks)=>set({myDecks: decks})
  }));