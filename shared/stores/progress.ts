import { create } from "zustand";

interface storeProps{
  progress: DeckProgress;
  setProgress: (progress: DeckProgress | null)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : {
    progress: {},
    lastReviewed: new Date()
  },
  setProgress: (progress)=>set(prev=>{
    if(!progress){
      return prev
    }else{
      return {progress};
    }
  })
}));