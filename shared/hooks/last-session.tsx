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

    const saveSession = async( session: Session, token?: string): Promise<boolean> => {
        try{
            const {deck_id, wrong, good, perfect, duration} = session
            const res = await fetch(API_BASE_URL+'/session', {
                method: 'POST',
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": 'Bearer '+ (token ?? await getLocal('JWT'))
                },
                body: JSON.stringify({deck_id, wrong, good, perfect, duration})
            })

            if(!res.ok){
                throw new Error('Failed to save session to API: '+ await res.text())
            }

            const body = await res.json();

            return true
        }catch(err){
            console.error(err);
            return false
            
        }

    }

    return{lastSession, setLastSession, getLastSession, saveSession}
}