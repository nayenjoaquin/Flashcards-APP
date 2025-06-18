import { Deck } from "types";
import { create } from "zustand";

interface storeProps{
  myDecks: Deck[];
  setMyDecks: (decks: Deck[])=>void;
}

export const decksStore = create<storeProps>(set=>({
  myDecks: [],
  setMyDecks: (decks)=>set({myDecks: decks}),
  }));