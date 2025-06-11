import { create } from "zustand";

interface storeProps{
  progress: Record<string, progress> | undefined;
  setProgress: (progress: Record<string, progress> | null)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : undefined,
  setProgress: (progress)=>set(prev=>{
    if(!progress){
      return prev
    }else{
      return {progress};
    }
  })
}));