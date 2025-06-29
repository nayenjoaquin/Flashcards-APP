import { sessionStore } from "shared/stores/last-session"
import { getLocal, saveLocal } from "shared/utils/common";
import { Deck, Progress, Session } from "types";
import { useProgress } from "./progress";

export const useSession = ()=>{
    const {lastSession, setLastSession} = sessionStore();
    const {saveProgress} = useProgress();

    const getLastSession = async(user_id?: string): Promise<Session | null> =>{
        if(!user_id){
            return null;
        }

        const session = await getLocal(user_id+' - LAST SESSION') as Session|null;
        return session

    }

    const saveSession = async( session: Session, user_id?: string): Promise<boolean> => {
        
        if(!user_id){
            return false;
        }
        const res = await saveLocal(user_id+' - LAST SESSION', session)
        if(!res){
            return false
        }
        setLastSession(session);
        return true;

    }

    return{lastSession, setLastSession, getLastSession, saveSession}
}