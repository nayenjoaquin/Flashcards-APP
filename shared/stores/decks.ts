import { Deck } from "types";
import { create } from "zustand";

interface storeProps{
  savedDecks: Deck[];
  myDecks: Deck[];
  setSavedDecks: (decks: Deck[])=>void;
  setMyDecks: (decks: Deck[])=>void;
}

export const decksStore = create<storeProps>(set=>({
  savedDecks: [],
  myDecks: [],
  setSavedDecks: (decks)=>set({savedDecks: decks}),
  setMyDecks: (decks)=>set({myDecks: decks})
  }));