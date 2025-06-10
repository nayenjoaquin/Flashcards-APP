import { removeLocaL } from "utils/functions";
import { create } from "zustand";

type AuthState = {
    user: User | undefined | null;
    setUser: (user: User|null)=>void;
}

export const AuthStore = create<AuthState>(set=>({
    user: undefined,
    setUser: user=>{
        set({user})
    },
}))