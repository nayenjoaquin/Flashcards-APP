import { create } from "zustand";

interface storeProps{
  progress: Record<string, progress>;
  setProgress: (progress: Record<string, progress> | null)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : {},
  setProgress: (progress)=>set(prev=>{
    if(!progress){
      return prev
    }else{
      return {progress};
    }
  })
}));