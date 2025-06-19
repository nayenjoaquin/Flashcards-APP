import { DeckProgress } from "types";
import { create } from "zustand";

interface storeProps{
  progress: DeckProgress;
  setProgress: (progress: DeckProgress)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : {
    progress: {},
  },
  setProgress: (progress)=>set(prev=>(
    {progress}
  ))
}));