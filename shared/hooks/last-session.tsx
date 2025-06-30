import { sessionStore } from "shared/stores/last-session"
import { getLocal, saveLocal } from "shared/utils/common";
import { Deck, Progress, Session } from "types";
import { useProgress } from "./progress";
import { API_BASE_URL } from "shared/const/strings";

export const useSession = ()=>{
    const {lastSession, setLastSession} = sessionStore();
    const {saveProgress} = useProgress();

    const getLastSession = async(token?: string): Promise<Session | null> =>{
        try{
            const res = await fetch(API_BASE_URL+'/last-review', {
                method: 'GET',
                headers: {
                    "Authorization": 'Bearer '+ (token ?? await getLocal('JWT'))
                }
            })

            if(!res.ok){
                throw new Error('Failed to retrieve last session from API: '+await res.text())
            }

            const body = await res.json();
            
            
            return {...body, created_at: new Date(body.created_at).getTime()} as Session
        }catch(err){
            console.error('Failed to retrieve last session from API');
            return null
        }
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