import { sessionStore } from "shared/stores/last-session"
import { getLocal, saveLocal } from "shared/utils/common";
import { Deck, newSession, Progress, Session } from "types";
import { useProgress } from "./progress";
import { API_BASE_URL } from "shared/const/strings";
import { APIgetLastSession, APIsaveSession } from "shared/api/session";
import { AuthStore } from "shared/stores/auth";

export const useSession = ()=>{
    const {lastSession, setLastSession} = sessionStore();
    const {saveProgress} = useProgress();
    const {user} = AuthStore();

    const getLastSession = async(): Promise<Session | null> =>{

       const lastSession = await APIgetLastSession(user?.token??await getLocal('JWT'));
       setLastSession(lastSession);
       return lastSession;
    }

    const saveSession = async( session: newSession ): Promise<boolean> => {

        const savedSession = await APIsaveSession(session, user?.token ?? await getLocal('JWT'));

        if(!savedSession) return false;
        
        setLastSession(savedSession);
        return true;
    }

    return{lastSession, setLastSession, getLastSession, saveSession}
}