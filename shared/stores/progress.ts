import { DeckProgress } from "types";
import { create } from "zustand";

interface storeProps{
  progress: DeckProgress | null;
  setProgress: (progress: DeckProgress|null)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : null,
  setProgress: (progress)=>set(prev=>(
    {progress}
  ))
}));