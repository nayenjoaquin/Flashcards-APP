import { create } from "zustand";

interface storeProps{
  decks: Deck[];
  setDecks: (decks: Deck[])=>void;
}

export const decksStore = create<storeProps>(set=>({
  decks : [],
  setDecks: (decks)=>set({decks}),
  }));