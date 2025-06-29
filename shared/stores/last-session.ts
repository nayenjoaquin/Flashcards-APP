import { Session } from "types";
import { create } from "zustand";

interface state{
    lastSession: Session | null;
    setLastSession: (session: Session | null)=>void;
}

export const sessionStore = create<state>(set=>({
    lastSession: null,
    setLastSession: (session: Session|null)=>{
        set({lastSession: session})
    }
}))